const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');

module.exports = {
    getPages: getPages,
    editPage: editPage
}

// Init client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function editPage(properties, page_id) {
    const payload = {
        path: `pages/${page_id}`,
        method: 'PATCH',
        body: properties
    }
    const results = await notion.request(payload);
}

async function getPages() {
    const payload = {
        path: `databases/${DATABASE_ID}/query`,
        method: 'POST'
    }
    const { results } = await notion.request(payload);

    const pages = results.map(page => {
        return {
            id: page.id,
            title: page.properties.Name.title[0].plain_text,
            createDate: page.created_time,
            updatedDate: page.last_edited_time,
            dueDate: page.properties['Due Date']?.date.start,
            calID: page.properties['Google Calendar ID'].rich_text
        }
    })

    return pages;
}
