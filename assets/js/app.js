const config = {
    apiKey: "AIzaSyAEcNCdXJpfzyzyF4mwfEGSK3z3WGRZabs",
    authDomain: "trainschedule-eb10b.firebaseapp.com",
    databaseURL: "https://trainschedule-eb10b.firebaseio.com",
    projectId: "trainschedule-eb10b",
    storageBucket: "trainschedule-eb10b.appspot.com",
    messagingSenderId: "665603344573"
};
firebase.initializeApp(config);

var db = firebase.firestore()

// var now
// var firstTrainTime
// var frequency


const calcArrival = (ftt, frq) => {

    let now = moment().unix() / 60
    let nextDep = moment(ftt, 'HH:mm').unix() / 60

    if (now > nextDep) {
    while () {
        
    }
    } 

    else if ( now < nextDep) {
        let before = moment(ftt, 'HH:mm').format('hh:mm A')
        return before
    }
}
const calcMinAway = (ftt, frq) => {
    return 2
}

document.querySelector('#Submit').addEventListener('click', e => {
    e.preventDefault()

    let trainName = document.querySelector('#trainName').value
    let Destination = document.querySelector('#Destination').value
    let firstTrainTime = document.querySelector('#firstTrainTime').value
    let frequency = document.querySelector('#frequency').value

    let arrival = calcArrival(firstTrainTime, frequency)
    let minAway = calcMinAway(firstTrainTime, frequency)

    let id = db.collection('submissions').doc().id
    db.collection('submissions').doc(id).set({
        a: trainName,
        b: Destination,
        c: firstTrainTime,
        d: frequency,
        e: arrival,
        f: minAway
    })

    document.querySelector('#trainName').value = ''
    document.querySelector('#Destination').value = ''
    document.querySelector('#firstTrainTime').value = ''
    document.querySelector('#frequency').value = ''
})

db.collection('submissions').onSnapshot(({ docs }) => {
    document.querySelector('.trainDisp').innerHTML = ''
    document.querySelector('.trainDisp').innerHTML = 
    `
        <tr>
         <th>Train Name:</th>
         <th>Destination:</th>
         <th>First Departure:</th>
         <th>Frequency:</th>
         <th>Next Arrival:</th>
         <th>Minutes Left:</th>
         </tr>
         `

    docs.forEach(doc => {
        let { a, b, c, d, e, f } = doc.data()
        let docElem = document.createElement('tr')
        docElem.innerHTML = `
      <th>${a}</th>
      <th>${b}</th>
      <th>${c}</th>
      <th>${d} min</th>
      <th>${e}</th>
      <th>${f}</th>
    `
        document.querySelector('.trainDisp').append(docElem)
    })

})