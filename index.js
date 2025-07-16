
document.addEventListener('DOMContentLoaded', () => {
   try {
      const calendarEl = document.getElementById('calendar');

      const calendar = new FullCalendar.Calendar(calendarEl, {
         initialView: 'dayGridMonth',
         locale: 'ko',
         height: 'auto',
         headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
         },
         businessHours: {
            dayOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:30',
            endTime: '17:45',
         },
         views: {
            dayGridMonth: {
                eventDidMount: function (info) {
                    info.el.classList.add(info.event.id);
                    info.el.classList.add(info.event.groupId);
        
                    // 기간 이벤트일 때 시간 텍스트 숨기기
                    const event = info.event;
        
                    const isMultiDay = event.end && !event.allDay &&
                       (event.end.getDate() !== event.start.getDate() ||
                          event.end.getMonth() !== event.start.getMonth() ||
                          event.end.getFullYear() !== event.start.getFullYear());
        
                    if (isMultiDay) {
                       const timeEl = info.el.querySelector('.fc-event-time');
                       if (timeEl) timeEl.style.display = "none"; // 시간 부분만 삭제
                    }
                 },
            },
            timeGridWeek: {
                slotLabelFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false  // ← 이게 핵심! 24시간제 표기
                  },
               allDayText: "종일",
               eventDidMount: function (info) {
                info.el.classList.add(info.event.id);
                info.el.classList.add(info.event.groupId);
               }
            },
            timeGridDay: {
                slotLabelFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false  // ← 이게 핵심! 24시간제 표기
                  },
               scrollTime: '08:30:00',
               allDayText: "종일",
               eventDidMount: function (info) {
                info.el.classList.add(info.event.id);
                info.el.classList.add(info.event.groupId);
                }
            },
            listWeek: {
                allDayText: "종일",
                eventDidMount: function (info) {
                    info.el.classList.add(info.event.id);
                    info.el.classList.add(info.event.groupId);
                    }
            }
         },
         dayCellContent: function (arg) {
            return {
               html: String(arg.date.getDate()),
            };
         },
         events: './events.json',
         
         eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
         },

         eventClick: function (info) {
            info.jsEvent.preventDefault();

            if (info.event.url) {
               window.open(info.event.url);
            }
         },
         navLinks: true, // 기본값 false
         navLinkDayClick: function(date, jsEvent) {
           calendar.changeView('timeGridDay', date);
         },
      });

      calendar.render();
   } catch (err) {
      console.log(err);
   }
});
