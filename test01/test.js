 /*
        events	이벤트 목록 (JSON 배열 또는 외부 URL 연동 가능)
        editable	드래그&드롭 가능 여부 (true/false)
        eventClick	이벤트 클릭 시 콜백
        dateClick	날짜 클릭 시 콜백
        eventDrop	이벤트를 이동했을 때 콜백
        */
        document.addEventListener('DOMContentLoaded', function () {
            const calendarEl = document.getElementById('calendar');
      
            const calendar = new FullCalendar.Calendar(calendarEl, {
              initialView: 'dayGridMonth', // 시작 뷰 (dayGridMonth, timeGridWeek, listWeek, 등)
              locale: 'ko', // 언어 설정 (한국어는 ko)
              //initialDate : "2025-06-17", // 초기 날짜. 지정하지 않을 경우 기본적으로 현재 날짜로 설정 됨 https://fullcalendar.io/docs/date-parsing

              // 헤더 도구 모음 : https://fullcalendar.io/docs/headerToolbar
              headerToolbar: {
                left: 'prevYear,prev,next,nextYear today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              },

              // 일자 클릭 시 이벤트 발생하도록
              navLinks: true, // 기본값 false
              navLinkDayClick: function(date, jsEvent) {
                console.log('day', date.toISOString());
                console.log('coords', jsEvent.pageX, jsEvent.pageY);
              },

              // 날짜 클릭 시 
              dateClick: function(e) {
                alert(e.dateStr + "이 클릭되었습니다.");
                console.log(e);
              },

              // 영업 시간
              businessHours: {
                dayOfWeek: [1,2,3,4,5],
                startTime: "08:30",
                endTime: "17:45",
              },
              /*
                +) 만약 일자별로 영업 시간이 다르다면,
                businessHours: [ // specify an array instead
                  {
                    daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
                    startTime: '08:00', // 8am
                    endTime: '18:00' // 6pm
                  },
                  {
                    daysOfWeek: [ 4, 5 ], // Thursday, Friday
                    startTime: '10:00', // 10am
                    endTime: '16:00' // 4pm
                  }
                ]
              */

              /*

              ** evnets-array : https://fullcalendar.io/docs/events-array
              ** event model : https://fullcalendar.io/docs/event-model
              ** event color : https://fullcalendar.io/docs/eventColor
              ** event popover: https://fullcalendar.io/docs/dayMaxEventRows

                << events : 달력에 표시될 이벤트 객체의 배열 >>

                ** 이벤트 객체 : https://fullcalendar.io/docs/event-object

                +) 배열의 마지막 뒤에 쉼표가 있으면 IE가 느려질 수 있다.

                << eventSources : 특정 옵션을 특정 소스에만 적용하려는 경우 유용 >>

                ** 이벤트 소스 옵션 목록 : https://fullcalendar.io/docs/event-source-object#options

                eventSources: [
                    // your event source
                    {
                      events: [ // put the array in the `events` property
                        {
                          title  : 'event1',
                          start  : '2010-01-01'
                        },
                        {
                          title  : 'event2',
                          start  : '2010-01-05',
                          end    : '2010-01-07'
                        }
                      ],
                      color: 'black',     // an option!
                      textColor: 'yellow' // an option!
                    }
                    // any other event sources...
                  ]
              */

              // 🔽 그냥 가져오기
              // events: [
              //    { title: '회의', start: '2025-07-14' },
              //    { title: '작업 마감', start: '2025-07-16', end: '2025-07-18' }
              // ]
      
              // 🔽 JSON 파일로부터 일정 불러오기
              events: function (info, successCallback, failureCallback) {

                // 1. 그냥 가져올 때
                // fetch('./events.json') // 상대 경로 또는 절대 경로 가능
                //   .then(response => {
                //     if (!response.ok) throw new Error('네트워크 오류');
                //     return response.json();
                //   })
                //   .then(data => {
                //     successCallback(data); // 일정 렌더링
                //   })
                //   .catch(error => {
                //     console.error('일정 로딩 실패:', error);
                //     failureCallback(error);
                //   });

                // 2. 카테코리로 분류
                fetch('./events.json')
                   .then((response) => {
                      if (!response.ok) throw new Error('네트워크 오류');
                      return response.json();
                   })
                   .then((data) => {
                      const modifiedEvents = data.map((event) => {
                         // 카테고리별 class 자동 추가
                         let categoryClass = '';

                         // category가 extendedProps에 존재하는 경우 처리
                         const category = event.extendedProps?.category;

                         switch (category) {
                            case '회의':
                               categoryClass = 'category-meeting';
                               break;
                            case '출장':
                               categoryClass = 'category-trip';
                               break;
                            case '문서':
                               categoryClass = 'category-doc';
                               break;
                            case '기타':
                               categoryClass = 'category-etc';
                               break;
                            default:
                               categoryClass = ''; // 없는 경우 class 추가 안함
                         }

                         // classNames 속성이 있으면 병합하고, 없으면 새로 생성
                         if (categoryClass) {
                            if (event.classNames) {
                               // 이미 있는 class와 병합
                               event.classNames = Array.isArray(event.classNames)
                                  ? [...event.classNames, categoryClass]
                                  : [event.classNames, categoryClass];
                            } else {
                               event.classNames = [categoryClass];
                            }
                         }

                         return event;
                      });

                      successCallback(modifiedEvents); // 최종 렌더링
                   })
                   .catch((error) => {
                      console.error('일정 로딩 실패:', error);
                      failureCallback(error);
                   });
              },

              eventClick: function(info) {
                console.log('Event: ' + info.event.title);
                console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                console.log('View: ' + info.view.type);
            
                // change the border color just for fun
                info.el.style.borderColor = 'red';

                // 이벤트에 url이 설정되어 있는 경우, 클릭하면 같은 창/탭에서 이동하는데, .preventDefault() 후에 여는 방법도 있다.

                info.jsEvent.preventDefault(); // don't let the browser navigate

                if (info.event.url) {
                   window.open(info.event.url); // https://www.w3schools.com/jsref/met_win_open.asp
                }
              }
            });
      
            calendar.render(); // 달력 초기화, 처음 렌더링 할 때도 필수

            document.getElementById("gotoDate").addEventListener("click",()=>{
                calendar.gotoDate("2026-03-03")
            })

            // 삭제 : calendar.destory()

            // 초기화 후에 옵션 가져오기 : calendar.getOpiton('local');

            document.getElementById("getEvents").addEventListener("click", ()=>{
                console.log("getEvents : ", calendar.getEvents());
                console.log("getEventById 'test03' : ", calendar.getEventById("test03"));
                console.log(calendar.getEventById("test03").title)
            })
          });