// Splits a full manuscript into chapters. A line such as "Chapter 1", "Chapter 2: Title",
// "Part 3", "Prologue", "Epilogue" or a markdown "# Heading" starts a new chapter.
const HEADING = /^\s*(?:#{1,3}\s+(.+)|((?:chapter|part)\s+[\w-]+.*)|(prologue|epilogue|prolog)\b.*)$/i

export function splitChapters(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  const chapters = []
  let current = null

  const push = () => {
    if (current && current.content.trim()) chapters.push({ ...current, content: current.content.trim() })
  }

  for (const line of lines) {
    const m = line.length < 90 && HEADING.exec(line)
    if (m) {
      push()
      current = { title: (m[1] || m[2] || m[3] || line).trim(), content: '' }
    } else {
      if (!current) current = { title: 'Chapter 1', content: '' }
      current.content += `${line}\n`
    }
  }
  push()
  return chapters
}

export async function readTextFile(file) {
  const text = await file.text()
  return { name: file.name.replace(/\.[^.]+$/, ''), text }
}

// Shrinks an uploaded cover so it stays light in storage.
export function imageToDataUrl(file, maxWidth = 600) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = url
  })
}
