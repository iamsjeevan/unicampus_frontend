#!/bin/bash

# Output file where all content will be concatenated
OUTPUT_FILE="frontend_code_for_api_integration.txt"

# Ensure the script is run from the project root (basic check)
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "ERROR: Please run this script from the root of your unicampus_frontend project."
  echo "       (The directory containing package.json and the src/ folder)"
  exit 1
fi

# List of files to concatenate
# Main required files:
FILES_TO_COLLECT=(
  "src/contexts/AuthContext.tsx"
  "src/components/auth/LoginScreen.tsx"
  "src/components/dashboard/Dashboard.tsx" # Representative data-fetching component
  "src/main.tsx"
)

# Optional but helpful file for POST/PUT example (if it exists and has API logic):
OPTIONAL_FILES=(
   "src/components/communities/CreatePostScreen.tsx"
   # Add other optional files here if relevant, e.g., for resource upload
   # "src/components/resources/ResourcesScreen.tsx"
)

# Clear the output file or create it with a header
echo "Frontend files for API integration - Collected on $(date)" > "$OUTPUT_FILE"
echo "==============================================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "Processing required files..."
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
    echo "!!! WARNING: File not found, skipping: $FILE_PATH !!!" >> "$OUTPUT_FILE"
    echo "!!! WARNING: File not found, skipping: $FILE_PATH !!!"
  fi
done

echo ""
echo "Processing optional files (if they exist)..."
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
    # Don't warn loudly for optional files, just note if not found
    echo "Optional file not found, skipping: $FILE_PATH"
  fi
done

echo ""
echo "All requested file contents have been written to: $OUTPUT_FILE"
echo "Please open $OUTPUT_FILE, copy its entire content, and paste it for me."