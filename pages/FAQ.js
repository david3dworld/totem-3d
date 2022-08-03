import React from 'react'
import Footer from './footer'
import Navbar from './navbar'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router';

export default function FAQ() {
  const { isAuthenticated, authenticate, logout: moralisLogout, account,Moralis,user } = useMoralis();
  const router = useRouter();
  return (
    <div style={{ backgroundColor: "#0D0F23", color: "#919CC1" }} className='text-sm flex flex-col items-center w-full'>
      <div className='w-4/5 '>
        <Navbar></Navbar>
        <div className='mt-20'>
            <p style={{ font : 'normal normal 600 45px/45px Chakra Petch' }} className='text-white'>FAQ</p>
            <br>
            </br>
            <p style={{ font : "normal normal normal 14px/22px Poppins" }} className='text-white'><span className=' font-bold'>What is TOTEM UNIVERSE?</span><br></br> TOTEM is a platform where fans and collectors are able to buy digital figurines from famous brands and official licenses.<br></br><br></br><span className=' font-bold'> What is an NFT?</span><br></br> It’s a digital asset that could represents real or digital objects like collectibles, music, art, music, videos, and more… They are frequently bought and sold online, with cryptocurrency or credit card through blockchain technology, same as cryptos.<br></br><br></br><span className=' font-bold'> Are these official figurine?</span><br></br> Every TOTEM®️ figurine is officially licensed and uniquely built. All collections are sold in limited editions.<br></br><br></br><span className=' font-bold'> Are there rarity levels?</span><br></br> With 4 levels of scarcity available (common, uncommon, rare, ultra-rare)— there will be exciting options for collectors of all levels. Scarcity will depend on the specialty and quantity of the figurine.<br></br><br></br> <span className=' font-bold'>How can I buy a TOTEM figurine?</span><br></br> In order to purchase a TOTEM figurine, you may either use your credit card or your crypto wallet.<br></br> Payment by credit card:<br></br> - Enter your Visa or Mastercard’s credentials here. <br></br>- Proceed to the payment. <br></br><br></br><span className=' font-bold'>Payment with crypto wallet:</span><br></br> Plug in your Meta mask wallet to your account <span onClick={function(){
              authenticate();
            }} className='cursor-pointer hover:opacity-80 hover:underline'>(click here)</span>.<br></br> - Click on mint <br></br>- Collect your figurine <br></br>- If you do not own a crypto wallet, you can create your first wallet <span onClick={function(){
            authenticate();
             }} className='cursor-pointer hover:opacity-80 hover:underline'>[here]</span>. <br></br><br></br><span className=' font-bold'>What is polygon?</span><br></br> Polygon is one of the leading blockchain platforms for high speed, low cost, and sustainable Web3 infrastructure. Polygon is building a complete suite of solutions that is similar to what Amazon Web Services offers Web2 developers — a tool for every possible use, case, and scaling at a click of a button.<br></br><br></br> <span className=' font-bold'>Is polygon sustainable?</span><br></br> Polygon is an organization that behaves responsibly and promotes sustainability at every level of the business. Their core business is to restore property which limits the use of new materials and waste. Their strategy is to continuously improve and to work even further with preventive services such as Internet of Things. Click <span onClick={function(){
              router.push("https://polygon.technology/");
             }} className='cursor-pointer hover:opacity-80 underline'> here</span> for more info on Polygon<br></br><br></br> <span className=' font-bold'>How can I build my own TOTEM?</span><br></br> Simply, go to your gallery, pick 3 figurines that you previously bought and chose your own combination.<br></br><br></br><span className=' font-bold'> How can I sell my TOTEM figurines?</span><br></br> For now, you can sell your TOTEM collectibles on a secondary market platform like OPENSEA…. <span onClick={function(){router.push("https://opensea.io/")}} className='cursor-pointer hover:opacity-80 hover:underline'>[link]</span><br></br><br></br> <span className=' font-bold'>Are TOTEM figurines available worldwide?</span><br></br> Yes! Our TOTEM figurines can be collected by fans and collectors worldwide, another glorious benefit of the digital age.<br></br><br></br><span className=' font-bold'> How can I be notified of new collection drops?</span><br></br> You can be notified of new collection drops by following us on any of our social media accounts, Medium feed or by joining the TOTEM community on discord.<br></br> <span onClick={function(){
              router.push("https://www.instagram.com/totem.universe/");
             }} className='cursor-pointer hover:opacity-80 hover:underline'>https://www.instagram.com/totem.universe/</span><br></br><span onClick={function(){
              router.push("https://twitter.com/totem_universe");
             }} className='cursor-pointer hover:opacity-80 hover:underline'>https://twitter.com/totem_universe</span><br></br><span onClick={function(){
              router.push("https://medium.com/@totemuniverse");
             }} className='cursor-pointer hover:opacity-80 hover:underline'> https://medium.com/@totemuniverse</span> <br></br><span onClick={function(){
              router.push("https://discord.com/invite/totem-universe");
             }} className='cursor-pointer hover:opacity-80 hover:underline'> https://discord.com/invite/totem-universe</span></p>
        </div>
        
<div className='h-10'></div>

        <Footer></Footer>

        </div>
    </div>
  )
}
