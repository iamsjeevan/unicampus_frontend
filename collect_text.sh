#!/bin/bash

# Output file where all content will be concatenated
OUTPUT_FILE="frontend_post_detail_integration.txt"

# Ensure the script is run from the project root (basic check)
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "ERROR: Please run this script from the root of your unicampus_frontend project."
  echo "       (The directory containing package.json and the src/ folder)"
  exit 1
fi

# List of files to concatenate
# Primary file needed for this integration:
FILES_TO_COLLECT=(
  "src/components/posts/PostDetailScreen.tsx" # The screen we are building/integrating
)

# Optional files if they exist and are relevant
OPTIONAL_FILES=(
  "src/components/comments/CommentListItem.tsx"  # If you have a component to render each comment
  "src/components/comments/CommentForm.tsx"      # If you have a separate form component for new comments
  "src/components/communities/PostListItem.tsx"  # For context on how posts are displayed in lists and voting
)

# Always include AuthContext, apiClient, App.tsx (for routing), and your types
ALWAYS_INCLUDE=(
  "src/contexts/AuthContext.tsx"
  "src/lib/apiClient.ts"
  "src/App.tsx"
  "src/types/community.ts" # Contains Post, Author, Comment (if you add it) types
  "src/types/index.ts"     # Or wherever your main types are defined if not in community.ts
)


# Clear the output file or create it with a header
echo "Frontend files for Post Detail & Comments API integration - Collected on $(date)" > "$OUTPUT_FILE"
echo "===============================================================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "Processing primary file for Post Detail & Comments integration..."
for FILE_PATH in "${FILES_TO_COLLECT[@]}"; do
  if [ -f "$FILE_PATH" ]; then
    echo "--- START OF FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    cat "$FILE_PATH" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE" # Add a newline for better separation
    echo "--- END OF FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--------------------------------------------------------------" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Added: $FILE_PATH"
  else
    echo "!!! WARNING: Primary file not found (or not yet created): $FILE_PATH !!!" >> "$OUTPUT_FILE"
    echo "!!! This is okay if PostDetailScreen.tsx is new. Please create it with skeleton code first if so. !!!"
    echo "!!! WARNING: Primary file not found (or not yet created): $FILE_PATH !!!"
  fi
done

echo ""
echo "Processing optional related files (if they exist)..."
for FILE_PATH in "${OPTIONAL_FILES[@]}"; do
  if [ -f "$FILE_PATH" ]; then
    echo "--- START OF FILE (Optional): $FILE_PATH ---" >> "$OUTPUT_FILE"
    cat "$FILE_PATH" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--- END OF FILE (Optional): $FILE_PATH ---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--------------------------------------------------------------" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Added (Optional): $FILE_PATH"
  else
    echo "Optional file not found, skipping: $FILE_PATH"
  fi
done

echo ""
echo "Processing core context/utility/routing/type files..."
for FILE_PATH in "${ALWAYS_INCLUDE[@]}"; do
  if [ -f "$FILE_PATH" ]; then
    echo "--- START OF CORE FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    cat "$FILE_PATH" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--- END OF CORE FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--------------------------------------------------------------" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Added (Core): $FILE_PATH"
  else
    # For src/types/index.ts, it's okay if it doesn't exist, types might be solely in community.ts
    if [[ "$FILE_PATH" == "src/types/index.ts" ]]; then
        echo "Core file (src/types/index.ts) not found, skipping (this might be okay)."
    else
        echo "!!! WARNING: Core file not found, skipping: $FILE_PATH !!!" >> "$OUTPUT_FILE"
        echo "!!! WARNING: Core file not found, skipping: $FILE_PATH !!!"
    fi
  fi
done


echo ""
echo "All requested file contents have been written to: $OUTPUT_FILE"
echo "Please open $OUTPUT_FILE, copy its entire content, and paste it for me."
echo "If 'src/components/posts/PostDetailScreen.tsx' was not found and you haven't created it yet,"
echo "please create a basic skeleton for it first (as shown in the previous message) and re-run this script."