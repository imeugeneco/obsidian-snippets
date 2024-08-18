<%*
const dv = app.plugins.plugins["dataview"].api;
const openPublishPanel = app.commands.commands["publish:view-changes"].callback;

const INDEX_DEVLOG_FILENAME = "Devlogs/@ Devlog Index";
const INDEX_DEVLOG_TITLE = "Devlogs";

const INDEX_2024_FILENAME = "2024/@ 2024 Index";
const INDEX_2024_TITLE = "2024";

const INDEX_HOME_FILENAME = "Hi";

function getDateTimeWithZone(){
  const now = new Date();
  const options = {timeZoneName: 'short'};
  const formattedDateTime = now.toLocaleString(undefined, options);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeZoneName = new Intl
  .DateTimeFormat('en-US', {timeZone, timeZoneName: 'long'})
  .formatToParts(now)
  .find(part => part.type === 'timeZoneName')
  .value;

  const dateTimeWithZone = `${formattedDateTime} (${timeZoneName})`;
  return dateTimeWithZone
}

async function createOrUpdateFile(filename, content) {
    let tFile = tp.file.find_tfile(filename);

    if (!tFile) {
        tFile = await tp.file.create_new("", filename);
        new Notice(`Created ${filename}.`);
    }

    try {
        await app.vault.modify(tFile, content);
        new Notice(`Updated ${tFile.basename}.`);
    } catch (error) {
        new Notice(`⚠️ ERROR updating! Check console. Skipped file: ${filename}`, 0);
    }
}

function formatQueryResults(lines) {
    return lines.map(line => {
        const parts = line.split("|");
        if (parts.length > 1) {
            const link = parts[0].trim();
            const title = parts[1].trim();
            return `${link}|${title}`;
        }
        return line;
    }).join("\n");
}

async function updateIndex(filename, query, title) {
	const dateTimeWithZone = getDateTimeWithZone();
    const queryOutput = await dv.queryMarkdown(query);
    const lines = queryOutput.value.split("\n");
    const formattedLines = formatQueryResults(lines);

    const fileContent = `---
tags: moc
---
[[Hi|← back to home]]

# ${title}

${formattedLines}
---
<font color=C0C0C0>Auto-updated on ${dateTimeWithZone}</font>`;

    await createOrUpdateFile(filename, fileContent);
}

await updateIndex(
    INDEX_DEVLOG_FILENAME,
    'LIST FROM "" WHERE contains(file.tags, "#devlog") AND !contains(file.path, "_unstaged") SORT file.day asc',
    INDEX_DEVLOG_TITLE
);

async function update2024Index() {
	const dateTimeWithZone = getDateTimeWithZone();
    const journalsQuery = 'LIST FROM "2024" WHERE contains(file.tags, "#journal") SORT file.day asc';
    const journalsOutput = await dv.queryMarkdown(journalsQuery);
    const formattedJournals = formatQueryResults(journalsOutput.value.split("\n"));

    const fileContent = `---
tags: moc
---
[[Hi|← back to home]]

# ${INDEX_2024_TITLE}

${formattedJournals}
---
<font color=C0C0C0>Auto-updated on ${dateTimeWithZone}</font>`;

    await createOrUpdateFile(INDEX_2024_FILENAME, fileContent);
}
await update2024Index();

async function updateHomeIndex() {
  const dateTimeWithZone = getDateTimeWithZone();

  const modifiedFilesQuery = 'LIST FROM "" WHERE !contains(file.tags, "#moc") AND !contains(file.path, "_unstaged") AND !(file.name="Hi") SORT file.mtime desc LIMIT 5';
  const modifiedQueryOutput = await dv.queryMarkdown(modifiedFilesQuery);
  const modifiedFilesformatted = formatQueryResults(modifiedQueryOutput.value.split("\n"));
  
  const recentFilesQuery = 'LIST FROM "" WHERE !contains(file.tags, "#moc") AND file.day AND !contains(file.path, "_unstaged") SORT file.day desc LIMIT 5';
  const recentQueryOutput = await dv.queryMarkdown(recentFilesQuery);
  const recentFilesFormatted = formatQueryResults(recentQueryOutput.value.split("\n"));
  const fileContent = `
## chacha's blog
Welcome to the archive :)
Topics are as random as my netflix history.

📂 [[@ 2024 Index|2024]]
📂 [[@ Devlog Index|Devlogs]]

#### Recently Modified
${modifiedFilesformatted}
#### Recently Added
${recentFilesFormatted}
---
<font color=C0C0C0>Auto-updated on ${dateTimeWithZone}</font>`;
  await createOrUpdateFile(INDEX_HOME_FILENAME, fileContent);
}
await updateHomeIndex();

openPublishPanel();
%>