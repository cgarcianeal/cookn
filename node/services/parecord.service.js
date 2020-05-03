const db = require('../_helpers/database');
const PArecord = db.PArecord;
const User = db.User;

module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord
};


async function addPArecord(parecord, user) {

    //populate missing fields in the parecord object
    let newrecord = parecord;
    parecord.createdBy = user;
    parecord.createdDate =  Date.now();

    // validate
    if (await PArecord.findOne({ createdBy: user, createdDate: parecord.createdDate  })) {
        throw 'Parecord created by"' + parecord.createdBy +" on "+ parecord.createdDate +'" already exists';
    }
    else if(!user){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }

    console.log('in db service ', parecord.createdBy);

    dbrecord = new PArecord(newrecord);


    // save the record
    await dbrecord.save();

    return { result: 'PArecord Added Successfully' }

}


async function getAllPArecords(){
    let PArecords = await PArecord.find({}).populate('createdBy');

    console.log(PArecords);

    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(PArecords);
        },10);

    });
}

async function deletePArecord(date, userID) {
    console.log('in the services', date, userID);

    console.log({ createdBy: userID, createdDate: date });

    let deletedPA = await PArecord.findOne({ createdBy: userID, createdDate: date });

    console.log(deletedPA);

    if (deletedPA) {
        PArecord.deleteOne({ createdBy: userID, createdDate: date }, function (err) {
            if (err){
                console.log('delete paracord of other user');
                return { result: 'Can not delete paracord of other user' };
            }
        });
    }

    return deletedPA;
}
