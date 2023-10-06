var Daytrip = [
{base_note: "C"},
{key: "major",
correspondence: 698},
{note: "C",
    correspondence: 1.000},
{note: "Db",
    correspondence: 0.491},
{note:"D",
    correspondence: 0.385},
{note:"Eb",
    correspondence: 0.310},
{note:"E",
    correspondence: 0.465},
{note:"F",
    correspondence: 0.551},
{note:"Gb",
    correspondence: 0.343},
{note:"G",
    correspondence: 0.591},
{note:"Ab",
    correspondence: 0.301},
{note:"A",
    correspondence: 0.310},
{note:"Bb",
    correspondence: 0.295},
{note:"B",
    correspondence: 0.478}
]

var GoingNowhere = [
{base_note: "Eb"},
{key: "minor",
    correspondence: 0.698},
{note: "C",
    correspondence:  0.262},
{note: "Db",
    correspondence: 0.383},
{note:"D",
    correspondence:  0.511},
{note:"Eb",
    correspondence:  0.807},
{note:"E",
    correspondence:   0.235},
{note:"F",
    correspondence:  0.618},
{note:"Gb",
    correspondence: 0.941},
{note:"G",
    correspondence: 0.654},
{note:"Ab",
    correspondence: 0.778},
{note:"A",
    correspondence: 0.325},
{note:"Bb",
    correspondence: 0.711},
{note:"B",
    correspondence: 1.000}
]

var Tzu = [
{base_note: "F"},
{key: "major",
    correspondence: 0.392},
{note: "C",
    correspondence: 0.614},
{note: "Db",
    correspondence: 0.535},
{note:"D",
    correspondence:  0.594},
{note:"Eb",
    correspondence:  0.606},
{note:"E",
    correspondence:  0.774},
{note:"F",
    correspondence:  1.000},
{note:"Gb",
    correspondence: 0.787},
{note:"G",
    correspondence: 0.581},
{note:"Ab",
    correspondence: 0.632},
{note:"A",
    correspondence: 0.782},
{note:"Bb",
    correspondence: 0.640},
{note:"B",
    correspondence: 0.863}
]

var Dept = [
{base_note: "Eb"},
{key: "minor",
    correspondence: 0.696},
{note: "C",
    correspondence: 0.374},
{note: "Db",
    correspondence: 0.282},
{note:"D",
    correspondence:  0.440},
{note:"Eb",
    correspondence:  1.000},
{note:"E",
    correspondence:  0.626},
{note:"F",
    correspondence: 0.438},
{note:"Gb",
    correspondence: 0.323},
{note:"G",
    correspondence: 0.571},
{note:"Ab",
    correspondence: 0.656},
{note:"A",
    correspondence: 0.434},
{note:"Bb",
    correspondence: 0.408},
{note:"B",
    correspondence:  0.295}
]

var RRH = [
{base_note: "B"},
{key: "minor",
    correspondence: 0.703},
{note: "C",
    correspondence: 0.555},
{note: "Db",
    correspondence: 0.409},
{note:"D",
    correspondence:  0.421},
{note:"Eb",
    correspondence:  0.583},
{note:"E",
    correspondence:  0.642},
{note:"F",
    correspondence: 0.538},
{note:"Gb",
    correspondence: 0.840},
{note:"G",
    correspondence: 0.535},
{note:"Ab",
    correspondence: 0.522},
{note:"A",
    correspondence: 0.763},
{note:"Bb",
    correspondence: 0.582},
{note:"B",
    correspondence:  1.000}
]

var Songs = [
    {
        name: "Daytrip",
        artist: "Brian Benett",
        audiopath: "audio/Daytrip.mp3",
        key: Daytrip
    },
    {
        name: "Sugar Tzu",
        artist: "Black Midi",
        audiopath: "audio/SugarTzu.mp3",
        key: Tzu
    },
    {
        name:"Going Nowhere",
        artist: "Elliot Smith",
        audiopath: "audio/GoingNowhere.mp3",
        key: GoingNowhere
    },
    {
        name:"Where Damage Isnt Already Done",
        artist: "The Radio Dept.",
        audiopath: "audio/Radiodept.mp3",
        key: Dept
    },
        {
        name:"Red Right Hand",
        artist: "Nick Cave and the Bad Seeds",
        audiopath: "audio/Red Right Hand.mp3",
        key: RRH
    }

]

var SongNumber;

function songSelect(value) {
    Songs.forEach((result,i) => {
        //console.log(result.name)
        if (value == result.name) {
            SongNumber = i;
            console.log(SongNumber, result);
            document.getElementById("songArtist").innerHTML = result.artist;
            document.getElementById("songTitle").innerHTML = result.name;

        }
    });
}

var link = decodeURI(window.location.href)
let regex = /#(.+)/g;
let songlink = link.match(regex);
//console.log(songlink.toString().replace("#", ""))
songSelect(songlink.toString().replace("#", ""));
