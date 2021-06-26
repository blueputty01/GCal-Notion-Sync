const getPages = require('./services/notion');
const calendar = require('./services/calendar');
const notion = require('./services/notion');

main();

async function main() {
    const { assignCalID: id } = await calendar.getCalendarID('Assignments', './data/calendar.json');
    await refresh(id);
}

async function refresh(calendarID) {
    const pages = await notion.getPages();

    const page = pages[0];
    pages.forEach(async (page) => {
        //if no due date assigned 
        if (page.dueDate === undefined) {
            return;
        }
        //if the calendar property is already filled (matching calendar event created)
        if (page.calID.length > 0) {
            return;
        }
        const result = await calendar.insertEvent(page.dueDate, page.title, calendarID);

        const { id: eventID } = result;
        const editedProperties = {
            'properties': {
                'Google Calendar ID': {
                    'rich_text': [
                        {
                            'text': {
                                content: eventID
                            }
                        }
                    ]
                }
            }
        }
        notion.editPage(editedProperties, page.id);

        
    });
}