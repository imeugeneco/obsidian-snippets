<%"---"%>
tags:
<%"---"%>

<%*
	const currentMoment = moment(tp.file.title, "YYYY-[W]WW");
	currentMoment.locale('en-gb');
	const hash = '# ';
	const slash = ' / ';
	const pipe = ' | ';
	const dash = ' - ';
	const leftAngle = '';
	const rightAngle = '';
	tR += hash + currentMoment.format('gggg [Week] WW') + '\n';
	tR += leftAngle;
	tR += '[[' + currentMoment.format('YYYY') + ']]' + slash;
	tR += '[[' + currentMoment.format('YYYY-[Q]Q|[Q]Q') + ']]' + slash;
	tR += '[[' + currentMoment.format('YYYY-MM|MMMM') + ']]';
	if (currentMoment.format('M') !== currentMoment.endOf('isoWeek').format('M')) {
	tR += slash + '[[' + currentMoment.format('YYYY') + ']]' + slash;
	tR += '[[' + currentMoment.format('YYYY-[Q]Q|[Q]Q') + ']]' + slash;
	tR += '[[' + currentMoment.format('YYYY-MM|MMMM') + ']]';
	}
	tR += rightAngle;
	tR += '\n';
	tR += leftAngle;
	currentMoment.add(-1,'weeks');
	tR += '[[' + currentMoment.format('gggg-[W]ww') + '|' + currentMoment.format('[Week] ww') + ']]' + pipe;
	currentMoment.add(1,'weeks');
	tR += currentMoment.format('[Week] ww') + pipe;
	currentMoment.add(1,'weeks');
	tR += '[[' + currentMoment.format('gggg-[W]ww') + '|' + currentMoment.format('[Week] ww') + ']]';
	currentMoment.add(-1,'weeks');
	tR += rightAngle;
	tR += '\n';
	tR += leftAngle;
	for (let day = 1; day <= 7; day++) {
	tR += '[[' + currentMoment.isoWeekday(day).format('YYYY-MM-DD|dddd') + ']]';
	if (day < 7) {
	tR += dash;
	}
	}  
	tR += rightAngle;
%>


[[<% moment(tp.file.title, "YYYY-[W]WW").format("YYYY-MM-DD") %>]]
- 

[[<% moment(tp.file.title, "YYYY-[W]WW").add(1, "days").format("YYYY-MM-DD") %>]]
- 

[[<% moment(tp.file.title, "YYYY-[W]WW").add(2, "days").format("YYYY-MM-DD") %>]]
- 

[[<% moment(tp.file.title, "YYYY-[W]WW").add(3, "days").format("YYYY-MM-DD") %>]]
- 

[[<% moment(tp.file.title, "YYYY-[W]WW").add(4, "days").format("YYYY-MM-DD") %>]]
- 

[[<% moment(tp.file.title, "YYYY-[W]WW").add(5, "days").format("YYYY-MM-DD") %>]]
- 

[[<% moment(tp.file.title, "YYYY-[W]WW").add(6, "days").format("YYYY-MM-DD") %>]]
- 
