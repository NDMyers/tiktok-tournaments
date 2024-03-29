'use client'

// import { fetchRedisClient } from "@/app/helpers/clientredis"
// import { addNewTikTok } from "@/app/helpers/tiktok"
// import { Redis } from "@upstash/redis/nodejs"
import Link from "next/link"
import axios, { AxiosError } from 'axios'
import { addNewTikTok } from "@/app/helpers/tiktok"
import { Loader2Icon, Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const HomePageButtons = () => {

    const router = useRouter()
    const [vidsIsLoading, setVidsIsLoading] = useState(false)
    const [addIsLoading, setAddIsLoading] = useState(false)

    const addVideo = async () => {
        try {
            setAddIsLoading(true)
            const user = document.getElementById('userInput').value
            const url = document.getElementById('urlInput').value
            const nickname = document.getElementById('nicknameInput').value

            if( user === '' || url === '' || nickname === '' ) {
                alert("Please fill out all forms before adding video")
            }

            // Successfully can add video, now go to video preview
            else {
                const embedUrl = addNewTikTok(url)
                await axios.post('/api/videos/preview', {
                    embedUrl,
                    user,
                    nickname,
                })
                
                window.location.href = '/preview'
            }
          
        } catch (error) {
            console.log(error)
        } finally {
            setAddIsLoading(false)
        }
    }

    const toVideos = () => {
        setVidsIsLoading(true)
        router.push(`/videos?example=${false}`)
    }

    return (

        <div className='flex flex-row md:w-1/2 w-full justify-evenly sm:pt-10 pt-8'>
            <div className='flex w-auto'>
                <button
                    onClick={addVideo}
                    className='bg-rose-500 sm:px-10 sm:py-4 rounded-2xl px-8 py-1 hover:ring hover:ring-cyan-400'
                >
                {addIsLoading ? <Loader2Icon className="animate-spin text-white"/> : <p className="text-white">Add Video</p>}
                </button>
            </div>
            <div className='flex w-auto'>
                <button
                    onClick={toVideos}
                    className='bg-rose-500 sm:px-10 sm:py-4 rounded-2xl px-8 py-5 hover:ring hover:ring-cyan-400'
                >
                    {vidsIsLoading ? <Loader2Icon className="animate-spin text-white"/> : <p className="text-white">My Videos</p>}
                </button>
            </div>
        </div>

    )
}

export default HomePageButtons
