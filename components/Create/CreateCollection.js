import React,{useRef, useState} from 'react'
import ImgIcon from '../../public/img-icon.svg'
import Discord from '../../public/discord.svg'
import Instagram from '../../public/instagram.svg'
import Medium from '../../public/medium.svg'
import Telegram from '../../public/telegram.svg'
import Web from '../../public/web.svg'
import Eth from '../../public/eth.svg'

const CreateCollection = () => {

const  [logoImg, setLogoImg] = useState(null)
const [feturedImg, setFeaturedImg] = useState(null)
const [banners, setBanners] = useState(null)
const nameRef = useRef(null)
const urlRef = useRef(null)
const descriptionRef = useRef(null)
const yoursiteRef = useRef(null)
const telegramRef = useRef(null)
const mediumRef = useRef(null)
const instaRef=useRef(null)
const discordRef = useRef(null)
const percentageFeeRef = useRef(null)
  return (
    <div>

<div className="create-header">

    <section className="create-page">
        <div className="container">
        <div className="row">

            <div className="create-sec">
                <div className="heading-sec">
                <h2 className="create-heading">  Create a Collection</h2>
                <p className="small-txt"> <span className="red-star">*</span> Required Fields</p>

                </div>

                <form action="" className="create-form">

                    <div className="create-head">
                    <h4 className="form-heading">Logo image <span className="red-star">*</span></h4>
                    <p className="form-para">This image will also be used for navigation. 350 x 350 recommended.</p>
                    <div className="form-img-ipt">
                    <div className="form-img-box1">

                        <label className="box-img1" htmlFor="icon">
                            <img className="box-img" src={ImgIcon.src} htmlFor="img-icon"/>
                          
                        </label>
                        <input style={{display: "none"}} id="icon" type="file" />
                    </div>
                </div>
                </div>



                    <div className="create-head">
                    <h4 className="form-heading">Featured image</h4>
                    <p className="form-para">This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of DaGames. 600 x 400 recommended.</p>
                    <div className="form-img-box">

                        <label className="box-img" htmlFor="svg">
                            <img src={ImgIcon.src} className="rounded"/>
                        </label>
                            <input style={{display: "none"}} id="svg" type="file" />

                    </div>
                </div>


                  <div className="create-head">
                    <h4 className="form-heading">Banner image </h4>
                    <p className="form-para">This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended.</p>
                    <div className="form-img-box2">
                        
                      <label className="box-img2" htmlFor="banner-img">
                            <img className="box-img" src={ImgIcon.src}/>
                        </label>
                            <input style={{display: "none"}} id="banner-img" type="file" />
                    </div>
                </div>


                        <div className="form-ipt-sec">
                            <h4 ref={nameRef} className="name-txt">Name <span className="red-star">*</span></h4>
                            <input type="text" className="form-ipt" placeholder="Item name"/>
                        </div>
            
                         <div className="form-ipt-sec">
                            <h4 className="name-txt">URL</h4>
                            <p className="para-txt">Customize your URL on DaGame. Must only contain lowercase letters, numbers, and hyphens.</p>
                            <input ref={urlRef} type="text" className="form-ipt" placeholder="https://DaGame.io/collection/"/>
                        </div>
                        
                  

                      <div className="form-ipt-sec">
                            <h4 className="name-txt">Description</h4>
                            <p className="para-txt"><a href="">Markdown</a>  syntax is supported. 0 of 1000 characters used.</p>
                            <textarea ref={descriptionRef}  type="text" className="form-area" placeholder=""></textarea>
                        </div>
                        
                                         
                        <div className="form-ipt-sec">
                            <h4 className="name-txt">Links</h4>
                          <div className="link-ipt">

                            <div className="input-group mt-3" >
                              <label className="input-group-text" style={{borderRadius: "7px 0 0 0", backgroundColor: "white", border: "none"}}>
                                <img src={Web.src}/>
                                </label>
                              <input className="form-selected" ref={yoursiteRef} placeholder="yoursite.io" style={{borderRadius:"0 7px  0 0", border: "none"}}/>
                            </div>
                            
                            <div className="input-group" >
                              <label className="input-group-text rounded-0 bg-light border-0">
                                  <img src={Discord.src}/></label>
                              <input ref={discordRef}className="form-selected rounded-0 border-0" placeholder="https://discord.gg/abcdef"/>
                            </div>
                            
                            <div className="input-group" >
                              <label className="input-group-text  rounded-0 bg-light border-0">
                                  <img src={Instagram.src}/></label>
                              <input ref={instaRef} className="form-selected rounded-0 border-0" placeholder="https://www.instagram.com/YourInstagramHandle"/>
                            </div>
                            
                            <div className="input-group" >
                              <label className="input-group-text rounded-0 bg-light border-0">
                                  <img src={Medium.src}/></label>
                              <input ref={mediumRef} className="form-selected rounded-0 border-0 " placeholder="https://www.medium.com/@YourMediumHandle"/>
                            </div>
                            
                            <div className="input-group border-0 " >
                              <label className="input-group-text bg-light" style={{borderRadius: "0 0 0 7px ", border: "none"}}>
                                  <img src={Telegram.src}/></label>
                              <input ref={telegramRef} className="form-selected bg-light border-0" style={{borderRadius:" 0 0  7px 0",}} placeholder="https://t.me/abcdef"/>
                            </div>


                                    </div>
                                    
                        </div>
            
                        
                         <div className="form-ipt-sec">
                            <h4 className="name-txt">Creator Earnings</h4>
                            <p className="para-txt">Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing. <a href="">Learn more about creator earnings.</a></p>
                          <h5 className="per-txt">Percentage fee</h5>
                            <input ref={percentageFeeRef}  type="text" className="form-ipt mt-3" placeholder="e.g. 25"/>
                        </div>


                    

                        <div className="form-btn-sec">
                        <a href="index.html" type="button" role="button" className="create-btn"  >Create</a>
                        </div>
                        
                </form>
            </div>

        </div>
    </div>
</section>

</div>

  
{/* <script src="js/bootstrap.bundle.js"></script>

<script src="js/jquery-3.6.0.min.js"></script>

<script src="js/core.js"></script>
<script>
const tooltip = document.querySelectorAll('.tt')
tooltip.forEach(t => {
  new bootstrap.Tooltip(t)
})

</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/tooltip.js/1.3.1/tooltip.min.js" integrity="sha512-ZAFwin0nQNXMJRo329TcU4ZyC+ZgKbnaopq/LH/6j7n9zT7ZVLK5BiSmnqgx7jNiewVLgc04geoE62cNN1D8VQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tooltip.js/1.3.1/tooltip.js" integrity="sha512-hCZ6qqx735npS7Y2pM1W0Z/igWLqqDNbZ/f9V9+PMW3FsMMygPxJhK2vHmtcDrk/Zuhq/KHErl+S6jakPLcOIw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}
</div>
  )
}

export default CreateCollection