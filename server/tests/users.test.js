const add=(a,b)=>a+b;

describe("Test1 sample",()=>
{
    test('should first', () => { 
        expect(add(3,4)).toBe(7)
     })
}
);

import { getUser,getUserFriends,addRemoveFriend } from "../Controllers/users";
import User from "../models/user";

// Mock the User model
jest.mock("../models/user");
let res,req,json,status;
req={params:{id:"1"}};
json=jest.fn();
status=jest.fn(()=>({json}));
res={status};
    


describe("getUser test function",()=>
{
    
    test("Get user by Id and send the success status 200",async ()=>{
        const mockuserdetails={ id: "1", name: "John Doe" };
        User.findById.mockResolvedValue(mockuserdetails);
        await getUser(req,res);
        expect(User.findById).toHaveBeenCalledWith("1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status().json).toHaveBeenCalledWith(mockuserdetails);
    })
    test("Throw erorr when something went wrong and call with status 404",async ()=>{
        const errormessage="something went wrong";
        User.findById.mockRejectedValue(new Error(errormessage));
        await getUser(req,res);
        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.status().json).toHaveBeenCalledWith({ message: errormessage });
    })
}
);

describe("getUserFriends unit test case", ()=>{
    
    test("Return user's friends by the userid and send the status code 200",async ()=>{
        const mockUser = { id: "1", friends: ["2", "3"] };
        const mockFriends = [
            { _id: "2", firstname: "Alice", lastname: "Smith", occupation: "Engineer", location: "New York", picturepath: "path/to/pic1" },
            { _id: "3", firstname: "Bob", lastname: "Johnson", occupation: "Designer", location: "San Francisco", picturepath: "path/to/pic2" }
        ];

        User.findById
            .mockResolvedValueOnce(mockUser) // Mock for the user
            .mockResolvedValueOnce(mockFriends[0]) // Mock for friend 1
            .mockResolvedValueOnce(mockFriends[1]); // Mock for friend 2

        await getUserFriends(req, res);
        expect(User.findById).toHaveBeenCalledWith("1");
        expect(User.findById).toHaveBeenCalledWith("2");
        expect(User.findById).toHaveBeenCalledWith("3");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status().json).toHaveBeenCalledWith(mockFriends);
    });
    test("Send the status code 404 when the user is not present",async ()=>{
        const errormessage="something went wrong";
        User.findById.mockRejectedValue(new Error(errormessage));
        await getUserFriends(req,res);
        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.status().json).toHaveBeenCalledWith({ message: errormessage });
    })
    test("Send the status code 404 when the user's friend is not present in the DB",async ()=>{
        const errormessage="Friend is invalid";
        const mockUser = { id: "1", friends: ["2", "3"] };
        User.findById
                    .mockResolvedValueOnce(mockUser)
                    .mockRejectedValue(new Error(errormessage));
        await getUserFriends(req,res);
        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.status().json).toHaveBeenCalledWith({ message: errormessage });})
})
describe("addRemoveFriend unit test case",()=>{

    test("Successfully removes the friend from the user's friend list and send the status code 200",async ()=>{
        const mockUser = { id: "1", friends: ["2", "3"] ,save: jest.fn()};
        const mockFriend = { id: "2", friends: ["1", "3"], save: jest.fn() };
        // const mockFriends = [
        //     { _id: "2", firstname: "Alice", lastname: "Smith", occupation: "Engineer", location: "New York", picturepath: "path/to/pic1" },
        //     { _id: "3", firstname: "Bob", lastname: "Johnson", occupation: "Designer", location: "San Francisco", picturepath: "path/to/pic2" }
        // ];
        const formattedFriendsoutput=[{ _id: "3", firstname: "Bob", lastname: "Johnson", occupation: "Designer", location: "San Francisco", picturepath: "path/to/pic2" }];
        const req = { params: { id: "1", friendid: "2" } };

        User.findById
            .mockResolvedValueOnce(mockUser) // Mock for the user
            .mockResolvedValueOnce(mockFriend) // Mock for friend 1
        await addRemoveFriend(req,res);
        expect(User.findById).toHaveBeenCalledWith("1");
        expect(User.findById).toHaveBeenCalledWith("2");
        expect(mockUser.friends).toEqual(["3"]);
        expect(mockFriend.friends).toEqual(["3"]);
        expect(mockUser.save).toHaveBeenCalled();
        expect(mockFriend.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status().json).toHaveBeenCalledWith(formattedFriendsoutput);
    });
    test("Return user's friends by the userid, add the friend to the user's friend list and send the status code 200",async ()=>{
        const mockUser = { id: "1", friends: [ "3"] };
        const mockFriend= {id:'2',friends:['3']};
        const mockFriends = [
            { _id: "2", firstname: "Alice", lastname: "Smith", occupation: "Engineer", location: "New York", picturepath: "path/to/pic1" },
            { _id: "3", firstname: "Bob", lastname: "Johnson", occupation: "Designer", location: "San Francisco", picturepath: "path/to/pic2" }
        ];
        const formattedFriends=[{ _id: "3", firstname: "Bob", lastname: "Johnson", occupation: "Designer", location: "San Francisco", picturepath: "path/to/pic2" }]
        User.findById
            .mockResolvedValueOnce(mockUser) // Mock for the user
            .mockResolvedValueOnce(mockFriend) // Mock for friend 1
        await addRemoveFriend(req,res);
        expect(User.findById).toHaveBeenCalledWith("1");
        expect(User.findById).toHaveBeenCalledWith("2");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status().json).toHaveBeenCalledWith(mockFriends);
    });


})