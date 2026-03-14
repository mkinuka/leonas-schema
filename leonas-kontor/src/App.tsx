import { useState } from 'react'
import './App.css'

interface Event {
  date: string
  start: string
  end: string
  course: string
  location: string
  type: string
  teacher: string
  comment: string
}

const ALL_EVENTS: Event[] = [
  // Week 12 (Mar 16–20)
  { date:'2026-03-16', start:'08:00', end:'17:00', course:'Programmeringsteknik I', location:'Se Ladok', type:'Tentamen', teacher:'', comment:'' },
  { date:'2026-03-19', start:'08:00', end:'17:00', course:'Biokemi I', location:'Se Ladok', type:'Tentamen', teacher:'', comment:'' },
  { date:'2026-03-20', start:'10:15', end:'12:00', course:'Envariabelanalys', location:'Sal 2004, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L8' },
  // Week 13 (Mar 23–27)
  { date:'2026-03-23', start:'08:15', end:'10:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F1' },
  { date:'2026-03-23', start:'10:15', end:'12:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F23' },
  { date:'2026-03-23', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Polhemsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F2' },
  { date:'2026-03-24', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F3' },
  { date:'2026-03-24', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L1' },
  { date:'2026-03-25', start:'08:15', end:'10:00', course:'Oorganisk kemi I', location:'Sal 80127, Ångström', type:'Kemiprofil', teacher:'Erik Lewin', comment:'Ingenjörsfärdigheter' },
  { date:'2026-03-25', start:'10:15', end:'12:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F24' },
  { date:'2026-03-26', start:'10:15', end:'17:00', course:'Oorganisk kemi I', location:'Kemilab 5304, Ångström', type:'Laboration', teacher:'', comment:'Lab 1' },
  { date:'2026-03-27', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Sal 2002, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L9' },
  // Week 14 (Mar 30 – Apr 3; Långfredag = Apr 3)
  // Week 15 (Apr 6–10; Annandag påsk = Apr 6)
  { date:'2026-04-07', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F25' },
  { date:'2026-04-08', start:'08:15', end:'10:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F26' },
  { date:'2026-04-08', start:'10:15', end:'17:00', course:'Oorganisk kemi I', location:'Sal 101172, Ångström', type:'Laboration', teacher:'', comment:'Lab 2 – Verkstad' },
  { date:'2026-04-09', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Sal 2002, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L10' },
  { date:'2026-04-09', start:'15:15', end:'17:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F4' },
  { date:'2026-04-10', start:'08:15', end:'09:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Kemiprofil', teacher:'Erik Lewin', comment:'Intervjua en alumn 1' },
  { date:'2026-04-10', start:'09:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F5' },
  // Week 16 (Apr 13–17)
  { date:'2026-04-13', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L2' },
  { date:'2026-04-13', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F27' },
  { date:'2026-04-14', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F6' },
  { date:'2026-04-14', start:'15:15', end:'17:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F28' },
  { date:'2026-04-15', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F7' },
  { date:'2026-04-16', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F8' },
  { date:'2026-04-16', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Sal 2003, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L11' },
  { date:'2026-04-17', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Kemiprofil', teacher:'Erik Lewin', comment:'Inspirationsföreläsning' },
  { date:'2026-04-17', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L3' },
  // Week 17 (Apr 20–24)
  { date:'2026-04-20', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F9' },
  { date:'2026-04-21', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F10' },
  { date:'2026-04-21', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Evelyn Sokolowski, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L4' },
  { date:'2026-04-22', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Evelyn Sokolowski, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L12' },
  { date:'2026-04-23', start:'10:15', end:'17:00', course:'Oorganisk kemi I', location:'Kemilab 5304, Ångström', type:'Laboration', teacher:'', comment:'Lab 3' },
  { date:'2026-04-24', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Evelyn Sokolowski, Ångström', type:'Kemiprofil', teacher:'Erik Lewin', comment:'Intervjua en alumn 2' },
  // Week 18 (Apr 27 – May 1; Valborg = Apr 30, Första maj = May 1)
  { date:'2026-04-27', start:'08:15', end:'10:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F11' },
  { date:'2026-04-27', start:'10:15', end:'12:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F29' },
  { date:'2026-04-27', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L5' },
  { date:'2026-04-28', start:'08:15', end:'10:00', course:'Oorganisk kemi I', location:'Evelyn Sokolowski, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L6' },
  { date:'2026-04-28', start:'10:15', end:'12:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F30' },
  { date:'2026-04-28', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Sal 2002, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L13' },
  { date:'2026-04-28', start:'15:15', end:'17:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Seminarium', teacher:'Guiomar Hernández', comment:'S1' },
  // Week 19 (May 4–8)
  { date:'2026-05-04', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L7' },
  { date:'2026-05-04', start:'15:15', end:'17:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F31' },
  { date:'2026-05-05', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Ångström', type:'Laboration', teacher:'', comment:'Förberedelse' },
  { date:'2026-05-05', start:'13:15', end:'17:00', course:'Oorganisk kemi I', location:'Kemilab 5304, Ångström', type:'Laboration', teacher:'', comment:'Lab 4' },
  { date:'2026-05-06', start:'10:15', end:'12:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F32' },
  { date:'2026-05-06', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Polhemsalen, Ångström', type:'Kemiprofil', teacher:'Erik Lewin', comment:'Inspirationsföreläsning' },
  { date:'2026-05-07', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Sal 2004, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L14' },
  { date:'2026-05-08', start:'10:15', end:'12:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Seminarium', teacher:'', comment:'S2' },
  { date:'2026-05-08', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Polhemsalen, Ångström', type:'Seminarium', teacher:'Peter Broqvist', comment:'S3' },
  // Week 20 (May 11–15; Kristi himmelsfärdsdag = May 14)
  { date:'2026-05-11', start:'08:15', end:'10:00', course:'Oorganisk kemi I', location:'Evelyn Sokolowski, Ångström', type:'Lektion', teacher:'Jonas Mindemark', comment:'L8' },
  { date:'2026-05-11', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F33' },
  { date:'2026-05-12', start:'08:15', end:'10:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Seminarium', teacher:'Andreas Orthaber', comment:'S4' },
  { date:'2026-05-12', start:'10:15', end:'17:00', course:'Oorganisk kemi I', location:'Kemilab 5304, Ångström', type:'Laboration', teacher:'', comment:'Lab 5' },
  { date:'2026-05-13', start:'08:15', end:'10:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Seminarium', teacher:'Samuel Edwards', comment:'S1' },
  // Week 21 (May 18–22)
  { date:'2026-05-18', start:'08:15', end:'10:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Seminarium', teacher:'Rebecca Clulow', comment:'S5' },
  { date:'2026-05-18', start:'10:15', end:'12:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F34' },
  { date:'2026-05-18', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Häggsalen, Ångström', type:'Föreläsning', teacher:'Martin Sahlberg', comment:'F12' },
  { date:'2026-05-18', start:'15:15', end:'17:00', course:'Oorganisk kemi I', location:'Evelyn Sokolowski, Ångström', type:'Kemiprofil', teacher:'Erik Lewin', comment:'Presentationsteknik' },
  { date:'2026-05-19', start:'08:15', end:'10:00', course:'Envariabelanalys', location:'Eva von Bahr-aulan, Ångström', type:'Föreläsning', teacher:'Samuel Edwards', comment:'F35' },
  { date:'2026-05-21', start:'10:15', end:'17:00', course:'Oorganisk kemi I', location:'Kemilab 5304, Ångström', type:'Laboration', teacher:'', comment:'Lab 6' },
  { date:'2026-05-22', start:'10:15', end:'17:00', course:'Oorganisk kemi I', location:'Kemilab 5304, Ångström', type:'Laboration', teacher:'', comment:'Lab 6' },
  // Week 22 (May 25–29; Pingstdagen = May 24 Sun)
  { date:'2026-05-25', start:'13:15', end:'15:00', course:'Envariabelanalys', location:'Sal 2002, Ångström', type:'Lektion', teacher:'Simon Lindblom', comment:'L15' },
  { date:'2026-05-25', start:'15:15', end:'17:00', course:'Oorganisk kemi I', location:'Polhemsalen, Ångström', type:'Kemiprofil', teacher:'Erik Lewin', comment:'Inspirationsföreläsning' },
  { date:'2026-05-29', start:'08:00', end:'17:00', course:'Envariabelanalys', location:'Se Ladok', type:'Tentamen', teacher:'', comment:'' },
  // Week 23 (Jun 1–5)
  { date:'2026-06-04', start:'08:00', end:'17:00', course:'Oorganisk kemi I', location:'Se Ladok', type:'Tentamen', teacher:'', comment:'' },
  { date:'2026-06-05', start:'09:15', end:'12:00', course:'Oorganisk kemi I', location:'Sal 2003, Ångström', type:'Muntlig examination', teacher:'Rebecca Clulow', comment:'' },
  { date:'2026-06-05', start:'13:15', end:'15:00', course:'Oorganisk kemi I', location:'Sal 2003, Ångström', type:'Muntlig examination', teacher:'Rebecca Clulow', comment:'' },
]

const HOLIDAYS: Record<string, string> = {
  '2026-04-03': 'Långfredag',
  '2026-04-06': 'Annandag påsk',
  '2026-04-30': 'Valborg',
  '2026-05-01': 'Första maj',
  '2026-05-14': 'Kristi himmelsfärdsdag',
}

const COURSE_STYLE: Record<string, { bg: string; accent: string; text: string }> = {
  'Envariabelanalys':       { bg: '#d8eeea', accent: '#96c0b7', text: '#1d4a44' },
  'Oorganisk kemi I':       { bg: '#e8edd9', accent: '#d4dfc7', text: '#2e3d20' },
  'Programmeringsteknik I': { bg: '#cdd0ce', accent: '#878e88', text: '#1a201b' },
  'Biokemi I':              { bg: '#fef6c9', accent: '#e8d36b', text: '#3d380a' },
}

const TYPE_LABEL: Record<string, string> = {
  'Föreläsning':       'Föreläsning',
  'Lektion':           'Lektion',
  'Laboration':        'Laboration',
  'Tentamen':          'Tentamen',
  'Seminarium':        'Seminarium',
  'Kemiprofil':        'Kemiprofil',
  'Muntlig examination': 'Oral exam',
}

const TYPE_COLOR: Record<string, string> = {
  'Föreläsning':       '#725752',
  'Lektion':           '#4a7a72',
  'Laboration':        '#5a6e40',
  'Tentamen':          '#a03030',
  'Seminarium':        '#5a4a7a',
  'Kemiprofil':        '#7a6040',
  'Muntlig examination': '#a03030',
}

const DAY_NAMES = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']
const SHORT_MONTHS = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec']

const START_HOUR = 8
const END_HOUR = 18
const PX_PER_HOUR = 76

// First Monday with data
const FIRST_MONDAY = new Date(2026, 2, 16)
// Last Monday in data range
const LAST_MONDAY  = new Date(2026, 5, 1)

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function getMonday(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return d
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function isoDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7)
}

function eventTop(start: string): number {
  return (toMinutes(start) - START_HOUR * 60) / 60 * PX_PER_HOUR
}

function eventHeight(start: string, end: string): number {
  const raw = (toMinutes(end) - toMinutes(start)) / 60 * PX_PER_HOUR
  return Math.max(raw, 28)
}

export default function App() {
  const [monday, setMonday] = useState<Date>(() => getMonday(FIRST_MONDAY))

  const canPrev = monday > FIRST_MONDAY
  const canNext = monday < LAST_MONDAY

  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(monday, i))
  const weekNum  = getISOWeek(monday)
  const friday   = weekDays[4]

  function fmtDayHeader(d: Date) {
    return `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`
  }

  return (
    <div className="schedule-app">
      {/* ─── HEADER ─── */}
      <header className="sch-header">
        <h1 className="sch-title">Leonas Schema</h1>
        <p className="sch-subtitle">Kemiteknik åk 1 · Grupp K1.A · Uppsala universitet</p>
      </header>

      {/* ─── WEEK NAV ─── */}
      <nav className="week-nav">
        <button
          className="nav-btn"
          disabled={!canPrev}
          onClick={() => setMonday(d => addDays(d, -7))}
        >
          ‹ Föregående
        </button>
        <div className="week-label">
          <span className="week-num">Vecka {weekNum}</span>
          <span className="week-range">
            {monday.getDate()} {SHORT_MONTHS[monday.getMonth()]} – {friday.getDate()} {SHORT_MONTHS[friday.getMonth()]} {friday.getFullYear()}
          </span>
        </div>
        <button
          className="nav-btn"
          disabled={!canNext}
          onClick={() => setMonday(d => addDays(d, 7))}
        >
          Nästa ›
        </button>
      </nav>

      {/* ─── CALENDAR ─── */}
      <div className="calendar-wrap">
        {/* Day headers */}
        <div className="cal-header-row">
          <div className="time-col-header" />
          {weekDays.map((d, i) => {
            const ds = isoDate(d)
            const holiday = HOLIDAYS[ds]
            return (
              <div key={i} className={`day-header${holiday ? ' day-header--holiday' : ''}`}>
                <span className="day-name">{DAY_NAMES[i]}</span>
                <span className="day-date">{fmtDayHeader(d)}</span>
                {holiday && <span className="holiday-badge">{holiday}</span>}
              </div>
            )
          })}
        </div>

        {/* Grid body */}
        <div className="cal-body">
          {/* Time axis */}
          <div className="time-axis">
            {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => (
              <div
                key={i}
                className="time-tick"
                style={{ top: i * PX_PER_HOUR - 9 }}
              >
                {String(START_HOUR + i).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Hour lines + day columns */}
          <div className="day-columns">
            {/* Background hour lines */}
            <div className="hour-lines">
              {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => (
                <div
                  key={i}
                  className="hour-line"
                  style={{ top: i * PX_PER_HOUR }}
                />
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((d, di) => {
              const ds = isoDate(d)
              const dayEvents = ALL_EVENTS.filter(e => e.date === ds)
              const isHoliday = !!HOLIDAYS[ds]
              return (
                <div key={di} className={`day-col${isHoliday ? ' day-col--holiday' : ''}`}>
                  {isHoliday && (
                    <div className="holiday-overlay">
                      <span>{HOLIDAYS[ds]}</span>
                    </div>
                  )}
                  {dayEvents.map((ev, ei) => {
                    const style = COURSE_STYLE[ev.course] ?? { bg: '#e9e9e9', accent: '#aaa', text: '#333' }
                    const typeColor = TYPE_COLOR[ev.type] ?? '#555'
                    const clampedEnd = toMinutes(ev.end) > END_HOUR * 60 ? `${END_HOUR}:00` : ev.end
                    const top    = eventTop(ev.start)
                    const height = eventHeight(ev.start, clampedEnd)
                    return (
                      <div
                        key={ei}
                        className="event-card"
                        style={{
                          top,
                          height,
                          background: style.bg,
                          borderLeftColor: style.accent,
                          color: style.text,
                        }}
                      >
                        <span
                          className="event-type-badge"
                          style={{ background: typeColor }}
                        >
                          {TYPE_LABEL[ev.type] ?? ev.type}
                        </span>
                        <div className="event-course">{ev.course}</div>
                        <div className="event-time">
                          {ev.start} – {ev.end}
                        </div>
                        {ev.location && (
                          <div className="event-location">📍 {ev.location}</div>
                        )}
                        {ev.teacher && (
                          <div className="event-teacher">👤 {ev.teacher}</div>
                        )}
                        {ev.comment && (
                          <div className="event-comment">{ev.comment}</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── LEGEND ─── */}
      <div className="legend">
        {Object.entries(COURSE_STYLE).map(([course, s]) => (
          <div key={course} className="legend-item">
            <span className="legend-dot" style={{ background: s.accent }} />
            {course}
          </div>
        ))}
      </div>
    </div>
  )
}

