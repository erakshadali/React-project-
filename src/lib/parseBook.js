// Splits a full manuscript into chapters. A line such as "Chapter 1", "Chapter 2: Title",
// "Part 3", "Prologue", "Epilogue" or a markdown "# Heading" starts a new chapter.
const HEADING = /^\s*(?:#{1,3}\s+(.+)|((?:chapter|part)\s+[\w-]+.*)|(prologue|epilogue|prolog)\b.*)$/i

// Removes the "[28/10, 16:03] name: " prefix that WhatsApp's "Export chat" puts on every message.
const CHAT_PREFIX = /^\[\d{1,2}\/\d{1,2}(?:\/\d{2,4})?,? \d{1,2}:\d{2}(?::\d{2})?(?: ?[AP]M)?\] [^:\n]{1,40}: ?/gim

export const cleanChatExport = (text) => text.replace(CHAT_PREFIX, '')

// headingAtEnd: the "Chapter N" line closes the chapter above it instead of opening the one below
// (the layout of a chat export where the label is sent after the text).
export function splitChapters(text, { headingAtEnd = false } = {}) {
  const lines = cleanChatExport(text).replace(/\r\n?/g, '\n').split('\n')
  const chapters = []
  let current = null

  const push = () => {
    if (current && current.content.trim()) chapters.push({ ...current, content: current.content.trim() })
  }

  for (const line of lines) {
    const m = line.length < 90 && HEADING.exec(line)
    const title = m && (m[1] || m[2] || m[3] || line).trim()
    if (m && headingAtEnd) {
      if (current) current.title = title
      push()
      current = null
    } else if (m) {
      push()
      current = { title, content: '' }
    } else {
      if (!current) current = { title: `Chapter ${chapters.length + 1}`, content: '' }
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
