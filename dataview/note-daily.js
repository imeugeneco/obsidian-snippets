<%"---"%>
tags:
<%"---"%>

<%*
	const currentMoment = moment(tp.file.title, "YYYY-MM-DD");
	currentMoment.locale('en-gb');
	const hash = '# ';
	const slash = ' / ';
	const pipe = ' | ';
	const leftAngle = '';
	const rightAngle = '';
	tR += hash + currentMoment.format('YYYY-MM-DD - dddd') + '\n';
	tR += leftAngle;
	tR += '[[' + currentMoment.format('YYYY') + ']]' + slash;
	tR += '[[' + currentMoment.format('YYYY-[Q]Q|[Q]Q') + ']]' + slash;
	tR += '[[' + currentMoment.format('YYYY-MM|MMMM') + ']]' + slash;
	tR += '[[' + currentMoment.format('gggg-[W]ww') + '|' + currentMoment.format('[Week] ww') + ']]';
	tR += rightAngle;
	tR += '\n';
	tR += leftAngle;
	currentMoment.add(-1,'days');
	tR += '[[' + currentMoment.format('YYYY-MM-DD') + ']]' + pipe;
	currentMoment.add(1,'days');
	tR += currentMoment.format('YYYY-MM-DD') + pipe;
	currentMoment.add(1,'days');
	tR += '[[' + currentMoment.format('YYYY-MM-DD') + ']]';
	currentMoment.add(-1,'days');
	tR += rightAngle;
%>


- 

## Ongoing Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
