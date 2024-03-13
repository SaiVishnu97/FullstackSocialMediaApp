import User  from "../models/user.js";

/*READ*/

export const getUser=async (req,res)=>{

    try{
        const {id}=req.params;
        const user= await User.findById(id);
        res.status(200).json(user);
    }catch(err)
    {
        res.status(404).json({message: err.message})
    }
}

export const getUserFriends=async (req,res)=>{

    try{
        const {id}=req.params;
        const user=await User.findById(id);
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id)));
        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturepath }) => {
                return { _id, firstname, lastname, occupation, location, picturepath };
            }
            );
        res.status(200).json(formattedFriends);
     }catch(err)
    {
        res.status(404).json({message: err.message})
    }
}

//Update users
export const addRemoveFriend=async (req,res,next)=>{

    try{
     const {id, friendid}=req.params;
     const user=await User.findById(id);
     const friend=await User.findById(friendid);
     if(user.friends.includes(friendid))
     {
        user.friends = user.friends.filter(id=>id!==friendid);
        friend.friends=friend.friends.filter(id=>id!==id);

     }
     else
     {
        user.friends.push(friendid);
        friend.friends.push(id);
     }
     await user.save();
     await friend.save();


    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
     const formattedFriends = friends.map(
        ({ _id, firstname, lastname, occupation, location, picturepath }) => {
            return { _id, firstname, lastname, occupation, location, picturepath };
        }
        );
    res.status(200).json(formattedFriends);
    
    }catch(err)
    {
        res.status(404).json({message: err.message})
    }
}

export const userPatternMatching= async (req,res)=>
{
    try{
        const {pattern}=req.query;
        console.log(pattern);
        console.log(req.user.id);

        if(!pattern)
            throw new Error('Empty pattern cannot be given');
        let [firstpatt,secondpatt]=pattern.split(' ');
        console.log(secondpatt);
        if(!secondpatt)
            secondpatt=firstpatt;
        console.log(secondpatt);

        const userarraynames= await User.find({$or:[{firstname:new RegExp(`${firstpatt}`,'i')},{lastname: new RegExp(`${secondpatt}`,'i')}]}).select({firstname:1,lastname:1});
        console.log(userarraynames);
        const resarrnames=userarraynames.map((obj,ind)=>{
             return {
                fullname:`${obj.firstname} ${obj.lastname}`,
                _id:obj._id
             }
        })
        res.status(200).json({resarrnames: resarrnames});
        console.log(resarrnames);
    }catch(err)
    {
        res.status(404).json({message: err.message})
    }
    
}