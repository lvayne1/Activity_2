
//EXAMPLE NI SIR 
/*function search(keyword) {
    let xml = document.getElementById("xmldata");
    let songs = xml.getElementsByTagName('song');

    for (let song of songs) {
        let title = song.getElementsByTagName("Title")[0].textContent.toUpperCase();
        let album = song.getElementsByTagName("Album")[0].textContent.toUpperCase();
        let genre = song.getElementsByTagName("Genre")[0].textContent.toUpperCase();
        let singerone = song.getElementsByTagName("Singerone")[0].textContent.toUpperCase();
        let singertwo = song.getElementsByTagName("Singertwo")[0].textContent.toUpperCase();

        if (title.includes(keyword.toUpperCase()) ||album.includes(keyword.toUpperCase()) || genre.includes(keyword.toUpperCase()) || singerone.includes(keyword.toUpperCase()) || singertwo.includes(keyword.toUpperCase())) {
            song.style.display = ""; // or apply your desired logic for displaying the song
        } else {
            song.style.display = "none"; // or apply your desired logic for hiding the song
        }
    }
} */


// kukunen yung data ng table rows sa XML
function dispalyingtableRows() {
    let xml = document.getElementById("xmldata");
    let songs = xml.getElementsByTagName("song");
    let tableRows = "";

    for (let song of songs) {
        let title = song.getElementsByTagName("Title")[0].lastChild.nodeValue;
        let album = song.getElementsByTagName("Album")[0].lastChild.nodeValue;
        let genre = song.getElementsByTagName("Genre")[0].lastChild.nodeValue;
        let singerone = song.getElementsByTagName("Singerone")[0].lastChild.nodeValue;
        let singertwo = song.getElementsByTagName("Singertwo")[0].lastChild.nodeValue;
        let imageSrc = song.getElementsByTagName("img")[0].getAttribute("src");

        tableRows += "<tr>" +
            "<td>" + song.getAttribute("code") + "</td>" +
            "<td>" + title + "</td>" +
            "<td>" + album + "</td>" +
            "<td>" + genre + "</td>" +
            "<td>" + singerone + "</td>" +
            "<td>" + singertwo + "</td>" +
            "<td><button onclick=\"displayImage('" + imageSrc + "')\">image</button></td>" +//"<td><img src='" + imageSrc + "' alt='Song Image'></td> "+
            "</tr>";
    }
    let additionalHeaderRow = "<tr>" +
        "<th>Song Code</th>" +
        "<th>Title</th>" +
        "<th>Album</th>" +
        "<th>Genre</th>" +
        "<th>Singer One</th>" +
        "<th>Singer Two</th>" +
        "<th>Image</th>" +
        "</tr>";
    
    return additionalHeaderRow + tableRows;
}


// // Function to populate the table with data
function populateTable() {
    let displayTable = document.getElementById("display");
    let tableRows = dispalyingtableRows();
    displayTable.innerHTML = tableRows;
    attachClickListeners();
}





// //DEAFULT NA MAY TABLE na kita yung image
// function search(str){
//     xml = document.getElementById("xmldata");
//     songs = xml.getElementsByTagName("song");
//     output="";

//     for(song of songs){
//         Title = song.getElementsByTagName("Title")[0].lastChild.nodeValue;
//         ImageSrc = song.getElementsByTagName("img")[0].getAttribute("src");

//         if(Title.toLowerCase().includes(str.toLowerCase())){
//             output+="<tr>"
//             +"<td>" + song.getAttribute("code") + "</td>"
//             +"<td>" + song.getElementsByTagName("Title")[0].lastChild.nodeValue + "</td>"
//             +"<td>" + song.getElementsByTagName("Album")[0].lastChild.nodeValue + "</td>"
//             +"<td>" + song.getElementsByTagName("Genre")[0].lastChild.nodeValue + "</td>"
//             +"<td>" + song.getElementsByTagName("Singerone")[0].lastChild.nodeValue + "</td>"
//             +"<td>" + song.getElementsByTagName("Singertwo")[0].lastChild.nodeValue + "</td>"
//             +"<td><img src='" + ImageSrc + "' alt='Song Image'></td>" // Display the image in a table cell
//             +"</tr>"
//         }
//     }

//     if(output===""){
//         output ="<tr><td colspan='7'> No Results found for <b>" + str + "</b>.</td></tr>";
//     }

//     document.getElementById("display").innerHTML = "<tr>" +
//     "<th> Title Id </th>" +
//     "<th> Title </th>" +
//     "<th> Album </th>" +
//     "<th> Genre </th>" +
//     "<th> Singer One </th>" +
//     "<th> Singer Two </th>" +
//     "<th> Image </th>" + 
//     "</tr>" + output;
// }


// function serach na butotn
function search(str) {
    str = str.toLowerCase(); 
    let xml = document.getElementById("xmldata");
    let songs = xml.getElementsByTagName("song");
    let output = "";

    for (let song of songs) {
        let Title = song.getElementsByTagName("Title")[0].lastChild.nodeValue;
        let Album = song.getElementsByTagName("Album")[0].lastChild.nodeValue;
        let Genre = song.getElementsByTagName("Genre")[0].lastChild.nodeValue;
        let Singerone = song.getElementsByTagName("Singerone")[0].lastChild.nodeValue;
        let Singertwo = song.getElementsByTagName("Singertwo")[0].lastChild.nodeValue;
        let ImageSrc = song.getElementsByTagName("img")[0].getAttribute("src");
        let songcode = song.getAttribute("code");

        if (Title.toLowerCase().includes(str) || songcode.toLowerCase().includes(str)|| Album.toLowerCase().includes(str) || Genre.toLowerCase().includes(str) || Singerone.toLowerCase().includes(str) || Singertwo.toLowerCase().includes(str)) {
            output += "<tr>" +
                "<td>" + song.getAttribute("code") + "</td>" +
                "<td>" + Title + "</td>" +
                "<td>" + Album + "</td>" +
                "<td>" + Genre + "</td>" +
                "<td>" + Singerone + "</td>" +
                "<td>" + Singertwo + "</td>" +
                "<td><button onclick=\"displayImage('" + ImageSrc + "')\">Show Image</button></td>" + //"<td><img src='" + imageSrc + "' alt='Song Image'></td> "+
                "</tr>";
        }
    }

    if (output === "") {
        output = "<tr><td colspan='7'> No Results found for <b>" + str + "</b>.</td></tr>";
    }

    document.getElementById("display").innerHTML = "<tr>" +
        "<th> Song Code </th>" +
        "<th> Title </th>" +
        "<th> Album </th>" +
        "<th> Genre </th>" +
        "<th> Singer One </th>" +
        "<th> Singer Two </th>" +
        "<th> Image </th>" +
        "</tr>" + output;
}


function displayImage(imageSrc) {
    let imgreveal = `<img src="${imageSrc}" alt="Song Image">`;
   
    let modalImg = document.getElementById("modalImg");
    modalImg.innerHTML = imgreveal;
    document.getElementById("modal").style.display = "block"

    let closeButton = document.getElementById("closeButton");
    closeButton.onclick = function(event) {
        event.stopPropagation(); 
        modal.style.display = 'none';
    };
}

// pag kinlcik yung specific na table kunwaremag ddisplay
function displaySongDetails(song) {
    let songCode = song.cells[0].lastChild.nodeValue;
    let title = song.cells[1].lastChild.nodeValue;
    let album = song.cells[2].lastChild.nodeValue;
    let genre = song.cells[3].lastChild.nodeValue;
    let singerOne = song.cells[4].lastChild.nodeValue;
    let singerTwo = song.cells[5].lastChild.nodeValue;
    let imageSrc = song.cells[6].querySelector("button").getAttribute("onclick").match(/'(.*?)'/)[1];

    let modalImg = document.getElementById("modal-image2");
    modalImg.src = imageSrc;

    let modalDetails = document.getElementById("modal-details2");
    modalDetails.innerHTML = `
        <p><strong>Song Code:</strong> ${songCode}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Album:</strong> ${album}</p>
        <p><strong>Genre:</strong> ${genre}</p>
        <p><strong>Singer One:</strong> ${singerOne}</p>
        <p><strong>Singer Two:</strong> ${singerTwo}</p>
    `;
    document.getElementById("modal2").style.display = "block";

    let closeButton2 = document.getElementById("closeButton2");
    let modal = document.getElementById("modal2");
    
    closeButton2.onclick = function(event) {
        event.stopPropagation(); 
        modal.style.display = 'none';
    };
    
}

function attachClickListeners() {
    let table = document.getElementById("display");
    let rows = table.getElementsByTagName("tr");
    for (let row of rows) 
    {
        row.addEventListener("click", function(event) 
        {
            let clickedElement = event.target;
            if (clickedElement.tagName !== "BUTTON") 
                {
                displaySongDetails(event.currentTarget); 
                }
        });
    }
}
