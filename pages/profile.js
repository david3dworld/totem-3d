import React, { useEffect, useState } from 'react'
import Navbar from "./navbar/index"
import { useMoralis } from 'react-moralis'
import bg from "../images/Bg.png"
import Image from 'next/image'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Footer from './footer';
import axios from 'axios';
import { saveProfile, editt } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';
import { uploadImage } from '../api/product'
import { NotificationManager } from 'react-notifications'

export default function MyProfile() {
    const { isAuthenticated, provider, isWeb3Enabled, account } = useMoralis()
    const [img, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [insta, setInsta] = useState("");

    const profile = useSelector(function (state) {
        return state.profile;
    })
    console.log(profile)

    const edit = useSelector(function (state) {
        return state.edit;
    })

    const dispatch = useDispatch();
    const token = useSelector(function (state) {
        return state.token;
    })
    const userId = useSelector(function (state) {
        return state.id;
    })

    const [profileInfo, setProfileInfo] = useState(null)
    const router = useRouter();
    useEffect(() => {
        if (!token && !account) {
            router.push('/login1')
        }
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/myProfile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (data) {
                if (data.data) {
                    console.log(data.data.data.data);
                    setProfileInfo(data.data.data.data)
                    setFirstName(data.data.data.data.name)
                    setName(data.data.data.data.surname)
                    setUsername(data.data.data.data.username)
                    setBio(data.data.data.data.bio)
                    setTwitter(data.data.data.data.twitter)
                    setInsta(data.data.data.data.instagram)
                }
            })

    }, [])

    let finalImage = ''
    if (imagePreview) {
        finalImage = imagePreview
    } else if (profileInfo) {
        finalImage = profileInfo?.profilepicture
    }
    const save = () => {
        const data = new FormData();
        console.log(token);

        data.append("surname", 'firstName');
        data.append("name", 'name');
        //data.append("bio",bio);
        //data.append("username",username);
        //data.append("twitter",twitter);
        //data.append("instagram",insta);
        data.append("profilepicture", 'img');
        dispatch(saveProfile({
            firstName: firstName,
            name: name,
            bio: bio,
            username: username,
            twitter: twitter,
            instagram: insta,
            id: userId
        }));
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
       
        if (imagePreview) {
            uploadImage(img, (error, res) => {
                axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/myProfile/update`, {
                    // "_id": userId,
                    surname: firstName,
                    name: name,
                    bio: bio,
                    username: username,
                    twitter: twitter,
                    instagram: insta,
                    profilepicture: `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/` + res.data.filename

                }, config).then(function (data) {
                    NotificationManager.success("Profile is updated successfully!")
                    console.log(data);
                }).catch(function (error) {
                    console.log(error);
                })
            })
        } else {
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/myProfile/update`, {
                surname: firstName,
                name: name,
                bio: bio,
                username: username,
                twitter: twitter,
                instagram: insta,
                // profilepicture: "https://shop.totem-universe.io/file/" + res.data.filename
            }, config).then(function (data) {
                NotificationManager.success("Profile is updated successfully!")
                console.log(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    return (
        <div className='text-sm flex flex-col w-full items-center' style={{ fontFamily: "Chakra Petch", backgroundColor: "#0D0F23", color: "#919CC1" }}>
            <div className='max-w-7xl w-full'>
                <Navbar></Navbar>

                <div style={{ background: '#161A42 ', borderRadius: '16px' }} className='w-full mt-8 flex items-center lg:flex-row flex-col'>
                    <div className='m-4'>
                        <p className='text-2xl text-white'>MY PROFILE</p>
                    </div>
                </div>
                <div className='flex w-full justify-center items-center mt-10'>
                    <div className='flex lg:flex-row flex-col lg:w-2/3 w-full items-center lg:items-start'>
                        <div className='m-10 flex lg:justify-start items-center justify-center items-center flex-col relative'>
                            {finalImage && <Image className=' rounded-full' width={110} height={110} src={finalImage} alt="" />}
                            {!finalImage && <Image className='rounded-full' width={110} height={110} src={bg} alt="" />}
                            <input disabled={!!account} onChange={function (e) {
                                const files = e.target.files[0];
                                console.log(files)
                                setImage(files);
                                setImagePreview(URL.createObjectURL(files));
                                console.log(img);
                            }} className='bg-none absolute top-0 left-0 h-40 w-full opacity-0 cursor-pointer' type="file"></input>
                            {!account && (
                                <p className='text-white mt-2 cursor-pointer hover:text-gray-300' style={{ font: 'normal normal medium 17px/17px Chakra Petch ' }}>Set Avatar</p>
                            )}
                        </div>
                        <div style={{ width: "340px" }} className='lg:p-3 max-w-full' >
                            <div>
                                <p className='text-white'>First name</p>
                                <input onChange={function (e) {
                                    setFirstName(e.target.value);
                                }}
                                    value={firstName} style={{ fontFamily: "Poppins", border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "100px" }} className="mt-1 w-full p-1"></input>
                                <p className='text-white'>Name</p>
                                <input onChange={function (e) {
                                    setName(e.target.value);
                                }}
                                    value={name} style={{ fontFamily: "Poppins", border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "100px" }} className="mt-1 w-full p-1"></input>
                                <p className='text-white'>Username</p>
                                <input onChange={function (e) {
                                    setUsername(e.target.value);
                                }}
                                    value={username} style={{ fontFamily: "Poppins", border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "100px" }} className="mt-1 w-full p-1"></input>
                                <p className='text-white'>Bio</p>
                                <div style={{ fontFamily: "Poppins" }}>
                                    <textarea onChange={function (e) {
                                        setBio(e.target.value);
                                    }}
                                        value={bio} rows={10} style={{ border: '1px solid #2C3166', background: "#0D0F23", borderRadius: "10px", padding: "5px" }} className="mt-1 w-full H-60"></textarea>
                                </div>
                                <div style={{ border: '1px solid #2E357B' }} className="w-full mt-8 mb-8">
                                </div>
                                <p className='text-white text-xl'>Social Accounts</p>
                                <p className='text-white mt-5 text-md' placeholder='@username'>Twitter @username</p>
                                <div style={{ borderRadius: '100px', border: '1px solid #2C3166', height: "32px" }} className='flex items-center '>
                                    <TwitterIcon className='ml-2'></TwitterIcon>
                                    <input onChange={function (e) {
                                        setTwitter(e.target.value);
                                    }}
                                        value={twitter} style={{ background: "#0D0F23", fontFamily: "Poppins" }} className="ml-2" placeholder='@username'></input>
                                </div>
                                <p className='text-white mt-5 text-md' placeholder='@username'>Instagram @username</p>
                                <div style={{ borderRadius: '100px', border: '1px solid #2C3166', height: "32px" }} className='flex items-center '>
                                    <InstagramIcon className='ml-2'></InstagramIcon>
                                    <input onChange={function (e) {
                                        setInsta(e.target.value);
                                    }}
                                        value={insta} style={{ background: "#0D0F23", fontFamily: "Poppins" }} className="ml-2" placeholder='@username'></input>
                                </div>
                            </div>


                            <div className='flex items-center justify-center mt-10'>
                                <div onClick={() => save()} className='hover:opacity-80 cursor-pointer text-center flex items-center justify-center' style={{ background: "#0EA8D6", color: "#161A42", borderRadius: "12px", width: "115px", height: "29px", font: "normal normal bold 14px/17px Chakra Petch" }}>
                                    <p>SAVE PROFILE</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-32">
                </div>
                <Footer ></Footer>
            </div>
        </div>
    )
}
