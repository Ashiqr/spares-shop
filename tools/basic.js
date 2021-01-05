function ObjectToArray(data, sortOrder){
    var result = [];
    if (sortOrder){
        for(var i = 0, len = sortOrder.length; i < len; i++){
            if (typeof(data[sortOrder[i]]) === Array){
                result.push(JSON.stringify(data[sortOrder[i]]));
            }
            else{
                result.push(data[sortOrder[i]]);
            }
        }
    }
    else{
        for(var key in Object.keys(data)){
            if (typeof(data[key] === Array)){
                result.push(JSON.stringify(data[key]));
            }
            else{
                result.push(data[key]);
            }
        }
    }
    return result;
}

function CleanQuotes(data){
    for(var i = 0, len = data.length; i < len; i++){
        if (typeof(data[i]) === 'string'){
            data[i] = data[i].replace(/["]+/g, '');
        }
    }
    return data;
}

function AutoTag(details, tags) {
    details.forEach(element => {
        if (tags.indexOf(element) < 0) {
            tags.push(element);
        }
    });
    return tags;
}

function MakeSearchTags(count, operator) {
    return Array(count).fill('Tags LIKE \'%\'|| ? || \'%\'').join(' ' + operator + ' ');
}

exports.ObjectToArray = ObjectToArray;
exports.CleanQuotes = CleanQuotes;
exports.AutoTag = AutoTag;
exports.MakeSearchTags = MakeSearchTags;
