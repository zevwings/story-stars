#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
refresh_timeline=false

usage() {
  printf '%s\n' \
    'Usage: scripts/project-status.sh [--refresh-timeline]' \
    '' \
    '默认只读取当前项目状态。' \
    '--refresh-timeline  重建并校验 Timeline GraphRAG；只写 ignored 派生缓存。'
}

case "${1:-}" in
  '') ;;
  --refresh-timeline) refresh_timeline=true ;;
  -h|--help)
    usage
    exit 0
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac

if [[ "$refresh_timeline" == true ]]; then
  if ! command -v sw >/dev/null 2>&1; then
    printf '%s\n' 'error: --refresh-timeline requires the sw command' >&2
    exit 1
  fi
  sw rag timeline build --root "$project_root"
  sw rag timeline validate --root "$project_root"
fi

count_rows() {
  local path="$1"
  local pattern="$2"
  awk -v pattern="$pattern" '$0 ~ pattern { count++ } END { print count + 0 }' "$path"
}

count_files() {
  local name="$1"
  find "$project_root/chapters" -mindepth 2 -type f -name "$name" -print 2>/dev/null |
    awk 'END { print NR + 0 }'
}

plotline_pending="$(count_rows "$project_root/story/plotlines/_status/pending.md" '^\\| \\[PL-')"
plotline_active="$(count_rows "$project_root/story/plotlines/_status/active.md" '^\\| \\[PL-')"
plotline_completed="$(count_rows "$project_root/story/plotlines/_status/completed.md" '^\\| \\[PL-')"
plotline_retired="$(count_rows "$project_root/story/plotlines/_status/retired.md" '^\\| (\\[|`)PL-')"
plotline_total=$((plotline_pending + plotline_active + plotline_completed + plotline_retired))

construction_active="$(count_rows "$project_root/story/construction/_status/active.md" '^\\| CON-')"
construction_bound="$(count_rows "$project_root/story/construction/_status/bound.md" '^\\| CON-')"
construction_consumed="$(count_rows "$project_root/story/construction/_status/consumed.md" '^\\| CON-')"
construction_superseded="$(count_rows "$project_root/story/construction/_status/superseded.md" '^\\| CON-')"
construction_retired="$(count_rows "$project_root/story/construction/_status/retired.md" '^\\| CON-')"
construction_total=$((construction_active + construction_bound + construction_consumed + construction_superseded + construction_retired))

chapter_dirs="$(find "$project_root/chapters" -mindepth 1 -maxdepth 1 -type d -name 'ch[0-9][0-9][0-9]' -print 2>/dev/null | awk 'END { print NR + 0 }')"
chapter_outlines="$(count_files outline.md)"
chapter_drafts="$(count_files draft.md)"
chapter_finals="$(count_files final.md)"
chapter_summaries="$(count_files summary.md)"

timeline_metadata="$project_root/.rag/generated/timeline/metadata.json"
timeline_events=0
timeline_build='未构建'
if [[ -f "$timeline_metadata" ]]; then
  timeline_build='已构建'
  timeline_events="$(awk -F ': ' '/"event_count"/ { value=$2; gsub(/[, ]/, "", value); print value }' "$timeline_metadata")"
  timeline_events="${timeline_events:-0}"
fi

if (( chapter_dirs == 0 && timeline_events == 0 )); then
  timeline_state='idle（尚无已登记章节；0 事件是合法空态）'
elif (( chapter_dirs > 0 && timeline_events == 0 )); then
  timeline_state='attention（已有章节但时间图无事件）'
else
  timeline_state='ready'
fi

git_branch="$(git -c core.fsmonitor=false -C "$project_root" branch --show-current)"
git_porcelain="$(git -c core.fsmonitor=false -C "$project_root" status --porcelain=v1 --untracked-files=all)"
git_staged="$(printf '%s\n' "$git_porcelain" | awk 'length($0) >= 2 && substr($0, 1, 1) != " " && substr($0, 1, 1) != "?" { count++ } END { print count + 0 }')"
git_unstaged="$(printf '%s\n' "$git_porcelain" | awk 'length($0) >= 2 && substr($0, 2, 1) != " " && substr($0, 2, 1) != "?" { count++ } END { print count + 0 }')"
git_untracked="$(printf '%s\n' "$git_porcelain" | awk 'substr($0, 1, 2) == "??" { count++ } END { print count + 0 }')"

printf '%s\n' \
  '# 项目实时状态' \
  '' \
  "- 生成时间：$(date '+%Y-%m-%d %H:%M:%S %Z')" \
  "- 项目根：$project_root" \
  '' \
  '| 领域 | 实时状态 |' \
  '| --- | --- |' \
  "| 正式剧情节点 | total ${plotline_total}；pending ${plotline_pending}；active ${plotline_active}；completed ${plotline_completed}；retired ${plotline_retired} |" \
  "| 施工单元 | total ${construction_total}；active ${construction_active}；bound ${construction_bound}；consumed ${construction_consumed}；superseded ${construction_superseded}；retired ${construction_retired} |" \
  "| 章节产物 | chapter dirs ${chapter_dirs}；outline ${chapter_outlines}；draft ${chapter_drafts}；final ${chapter_finals}；summary ${chapter_summaries} |" \
  "| Timeline GraphRAG | ${timeline_build}；events ${timeline_events}；${timeline_state} |" \
  "| Git | branch ${git_branch}；staged ${git_staged}；unstaged ${git_unstaged}；untracked ${git_untracked} |"
