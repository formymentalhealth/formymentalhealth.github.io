const names = [
    'William',
    'Agnes',
    'Mateus',
    'Lucas',
    'Manuela',
    'Jaque',
    'Luana',
    'Lara',
    'Wesley',
    'Esther',
    'Gabriel',
    'Mahonri',
    'Valentina'
]

function getCharProperties(str) {
    let props = {};

    [...str].forEach((c, i) => {
        if (c in props) {
            props[c][0]++;
        } else {
            props[c] = [1, new Set()];
        }

        if (i > 0) props[c][1].add(str[i - 1]);
        if (i + 1 < str.length) props[c][1].add(str[i + 1]);
    });

    return props;
}

function getDistance(itemProps, name) {
    name = name.toLowerCase().replace(/[^a-z]/gi, '');
    const nameProps = getCharProperties(name);

    let distance = 0

    for (const key in itemProps) {
        if (!(key in nameProps)) {
            distance++;
            continue;
        }

        const neighbors = new Set([...itemProps[key][1]]
                                  .filter(i => nameProps[key][1].has(i)));

        distance += Math.abs(itemProps[key][0] - nameProps[key][0]);
        distance -= neighbors.size;
    }

    return distance;
}

function correctLine(item) {
    item = item.toLowerCase().replace(/[^a-z]/gi, '');
    const itemProps = getCharProperties(item);

    const distances = names.map(name => getDistance(itemProps, name));

    if (!distances.some(distance => distance < 0)) return;

    return `- ${names[distances.indexOf(Math.min(...distances))]}`;
}

function correct(list) {
    let header;
    let lines = [];

    for (const line of list.split('\n')) {
        if (!header && (/lista|atsil|amrifnoc|confirma/gi).test(line)) {
            header = line;
        } else {
            const correctedLine = correctLine(line);

            if (correctedLine !== undefined) {
                lines.push(correctedLine);
            }
        }
    }

    if (header === undefined) header = '';

    return `${header}\n${lines.join('\n')}`;
}
