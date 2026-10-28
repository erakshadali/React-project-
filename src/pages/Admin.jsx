import { useRef, useState } from 'react'
import {
  Alert, Box, Button, Checkbox, Container, FormControlLabel, IconButton, List, ListItem,
  ListItemText, Paper, Stack, TextField, Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import { useBooks, slugify } from '../lib/booksContext'
import { href } from '../lib/router'
import { imageToDataUrl, readTextFile, splitChapters } from '../lib/parseBook'

// Client-side gate only: it keeps casual visitors out but is NOT real security.
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'dreamy123'

const emptyBook = () => ({
  id: '', title: '', author: '', cover: '', genres: [], tags: [], mature: false,
  status: 'Ongoing', blurb: '', quote: '', wattpadUrl: '', featured: false, chapters: [],
})
const csv = (s) => s.split(',').map((x) => x.trim()).filter(Boolean)

function Login({ onOk }) {
  const [pw, setPw] = useState('')
  const [bad, setBad] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('admin', 'yes'); onOk() } else setBad(true)
  }
  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Paper component="form" onSubmit={submit} sx={{ p: 4, borderRadius: '28px' }}>
        <Typography variant="h4" gutterBottom>Admin login</Typography>
        <TextField fullWidth type="password" label="Password" value={pw} onChange={(e) => setPw(e.target.value)} error={bad} helperText={bad ? 'Wrong password' : ''} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Enter</Button>
      </Paper>
    </Container>
  )
}

function BookForm({ initial, onSave, onCancel }) {
  const [book, setBook] = useState(initial)
  const [genres, setGenres] = useState(initial.genres.join(', '))
  const [tags, setTags] = useState(initial.tags.join(', '))
  const [manuscript, setManuscript] = useState('')
  const [msg, setMsg] = useState('')
  const fileRef = useRef()
  const set = (k) => (e) => setBook({ ...book, [k]: e.target.value })

  const onCover = async (e) => {
    const f = e.target.files[0]
    if (f) setBook({ ...book, cover: await imageToDataUrl(f) })
  }

  // One .txt/.md file with many chapters -> split; several files -> one chapter each.
  const onFiles = async (e) => {
    const files = [...e.target.files].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    if (!files.length) return
    const read = await Promise.all(files.map(readTextFile))
    const chapters = read.length === 1
      ? splitChapters(read[0].text)
      : read.map((r) => ({ title: r.name, content: r.text.trim() }))
    setBook((b) => ({ ...b, chapters: [...b.chapters, ...chapters] }))
    setMsg(`Added ${chapters.length} chapter(s) from ${files.length} file(s).`)
    e.target.value = ''
  }

  const addPasted = () => {
    const chapters = splitChapters(manuscript)
    setBook((b) => ({ ...b, chapters: [...b.chapters, ...chapters] }))
    setMsg(`Added ${chapters.length} chapter(s) from pasted text.`)
    setManuscript('')
  }

  const editChapter = (i, patch) =>
    setBook((b) => ({ ...b, chapters: b.chapters.map((c, j) => (j === i ? { ...c, ...patch } : c)) }))
  const removeChapter = (i) => setBook((b) => ({ ...b, chapters: b.chapters.filter((_, j) => j !== i) }))

  const submit = (e) => {
    e.preventDefault()
    onSave({
      ...book,
      id: book.id || slugify(book.title),
      genres: csv(genres),
      tags: csv(tags).map((t) => t.replace(/^#/, '')),
      cover: book.cover || '',
      createdAt: book.createdAt || Date.now(),
    })
  }

  return (
    <Paper component="form" onSubmit={submit} sx={{ p: { xs: 2, md: 4 }, borderRadius: '28px' }}>
      <Typography variant="h4" gutterBottom>{initial.id ? 'Edit book' : 'Add a new book'}</Typography>
      <Stack spacing={2}>
        <TextField required label="Title" value={book.title} onChange={set('title')} />
        <TextField required label="Author" value={book.author} onChange={set('author')} />
        <TextField label="Genres (comma separated)" value={genres} onChange={(e) => setGenres(e.target.value)} />
        <TextField label="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <TextField label="Status" value={book.status} onChange={set('status')} helperText="Ongoing or Completed" />
        <TextField label="Summary / blurb" multiline minRows={4} value={book.blurb} onChange={set('blurb')} />
        <TextField label="Favourite quote (shown on the homepage if featured)" value={book.quote} onChange={set('quote')} />
        <TextField label="Wattpad link (optional)" value={book.wattpadUrl} onChange={set('wattpadUrl')} />
        <Box>
          <Button component="label" variant="outlined">
            Upload cover image
            <input hidden type="file" accept="image/*" onChange={onCover} />
          </Button>
          {book.cover && <Box component="img" src={book.cover} alt="cover preview" sx={{ display: 'block', mt: 2, height: 160, borderRadius: '10px' }} />}
        </Box>
        <FormControlLabel control={<Checkbox checked={book.mature} onChange={(e) => setBook({ ...book, mature: e.target.checked })} />} label="Mature (18+) — readers must confirm their age" />
        <FormControlLabel control={<Checkbox checked={book.featured} onChange={(e) => setBook({ ...book, featured: e.target.checked })} />} label="Feature on homepage" />

        <Typography variant="h5" sx={{ pt: 2 }}>Upload the full book</Typography>
        <Alert severity="info">
          Upload one <b>.txt</b> or <b>.md</b> file with the whole book — it is split into chapters wherever a line starts with
          “Chapter …”, “Part …”, “Prologue”, “Epilogue” or a “# Heading”. Or select several files and each becomes one chapter.
          For a Word/PDF book, copy the text into a .txt file or paste it below.
        </Alert>
        <Box>
          <Button variant="contained" onClick={() => fileRef.current.click()}>Choose .txt / .md file(s)</Button>
          <input ref={fileRef} hidden multiple type="file" accept=".txt,.md,text/plain,text/markdown" onChange={onFiles} />
        </Box>
        <TextField label="…or paste the manuscript here" multiline minRows={5} value={manuscript} onChange={(e) => setManuscript(e.target.value)} />
        <Box><Button variant="outlined" disabled={!manuscript.trim()} onClick={addPasted}>Add pasted text as chapters</Button></Box>
        {msg && <Alert severity="success">{msg}</Alert>}

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{book.chapters.length} chapter(s)</Typography>
        <List disablePadding>
          {book.chapters.map((c, i) => (
            <ListItem key={i} disableGutters secondaryAction={<IconButton onClick={() => removeChapter(i)} aria-label="Delete chapter"><DeleteIcon /></IconButton>}>
              <TextField size="small" sx={{ mr: 6 }} fullWidth value={c.title} onChange={(e) => editChapter(i, { title: e.target.value })}
                helperText={`${c.content.split(/\s+/).length} words`} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" size="large">Save book</Button>
          <Button onClick={onCancel} size="large">Cancel</Button>
        </Box>
      </Stack>
    </Paper>
  )
}

export default function Admin() {
  const { books, saveBook, deleteBook } = useBooks()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin') === 'yes')
  const [editing, setEditing] = useState(null)

  if (!authed) return <Login onOk={() => setAuthed(true)} />

  if (editing) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <BookForm initial={editing} onCancel={() => setEditing(null)}
          onSave={async (b) => {
            // Only one featured book at a time.
            if (b.featured) await Promise.all(books.filter((x) => x.featured && x.id !== b.id).map((x) => saveBook({ ...x, featured: false })))
            await saveBook(b)
            setEditing(null)
          }} />
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>Admin</Typography>
        <Button variant="contained" onClick={() => setEditing(emptyBook())}>+ Add book</Button>
      </Box>
      <Paper sx={{ borderRadius: '20px' }}>
        <List>
          {books.map((b) => (
            <ListItem key={b.id} divider
              secondaryAction={<>
                <IconButton onClick={() => setEditing(b)} aria-label="Edit"><EditIcon /></IconButton>
                <IconButton onClick={() => window.confirm(`Delete “${b.title}”?`) && deleteBook(b.id)} aria-label="Delete"><DeleteIcon /></IconButton>
              </>}>
              <ListItemText primary={<a href={href('book', b.id)} style={{ color: 'inherit' }}>{b.title}</a>} secondary={`${b.author} · ${b.chapters.length} chapters`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}
