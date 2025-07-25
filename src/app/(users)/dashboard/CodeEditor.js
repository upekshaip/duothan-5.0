"use client"

import { Textarea } from "@/components/ui/textarea"

export default function CodeEditor({ value, onChange, language, height = "200px" }) {
  const getPlaceholder = (lang) => {
    const placeholders = {
      javascript: `// Write your JavaScript solution here
function solution() {
    // Your code here
    return result;
}`,
      python: `# Write your Python solution here
def solution():
    # Your code here
    return result`,
      java: `// Write your Java solution here
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
      cpp: `// Write your C++ solution here
#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
      c: `// Write your C solution here
#include <stdio.h>

int main() {
    // Your code here
    return 0;
}`,
    }
    return placeholders[lang] || placeholders.javascript
  }

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={getPlaceholder(language)}
        className="code-editor font-mono text-sm resize-none"
        style={{ height }}
        spellCheck={false}
      />
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
        {language.toUpperCase()}
      </div>
    </div>
  )
}
