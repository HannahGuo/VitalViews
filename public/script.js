var firebaseConfig = {
    apiKey: "AIzaSyAMlcBJ6VuijRQpedVhmnXLUi3VfK2tjCU",
    authDomain: "vitals-858d7.firebaseapp.com",
    databaseURL: "https://vitals-858d7.firebaseio.com",
    projectId: "vitals-858d7",
    storageBucket: "vitals-858d7.appspot.com",
    messagingSenderId: "469201996563",
    appId: "1:469201996563:web:1bfda6a3d7a40c50a2a8e6"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var csv = "";

function readData() {
    database.ref().on("value", function (snapshot) {
        snapshot.forEach(function (child) {
            $('#tableBody').append(`<tr>
            <td>${child.val()["date"]}</td><td>${child.val()["time"]}</td>
            <td>${child.val()["bloodPressureSystolic"]}</td>
            <td>${child.val()["bloodPressureDiatolic"]}</td>
            <td>${child.val()["heartRate"]}</td>
            <td>${child.val()["spo2"]}</td>
            <td>${child.val()["temperature"]}</td>
            <td>${child.val()["bloodSugar"]}</td>
            </tr>`);
        });
    });
}

function downloadCSV() {
    $('table').each(function () {
        var $table = $(this);
        var csv = $table.table2CSV({
            delivery: 'value'
        });

        console.log(csv);

        var link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        link.setAttribute('download', "vitals.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

readData();