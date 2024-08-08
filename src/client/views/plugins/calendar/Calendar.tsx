import React, { useState } from 'react'
import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'

const handleDateSelect = (selectInfo: DateSelectArg) => {
  const title = prompt('Please enter a new title for your event')
  const calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })
  }
}

const handleEventClick = (clickInfo: EventClickArg) => {
  // eslint-disable-next-line no-restricted-globals
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

const Calendar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weekendsVisible, setWeekendsVisible] = useState(true)

  return (
    <CCard className="mb-4">
      <CCardHeader>FullCalendar</CCardHeader>
      <CCardBody>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={(events: EventApi[]) => setCurrentEvents(events)} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </CCardBody>
    </CCard>
  )
}

export default Calendar
