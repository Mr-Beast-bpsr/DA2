import React from 'react'
import ImgIcon from '../public/img-icon.svg'
import Discord from '../public/discord.svg'
import Instagram from '../public/instagram.svg'
import Medium from '../public/medium.svg'
import Telegram from '../public/telegram.svg'
import Web from '../public/web.svg'
import Eth from '../public/eth.svg'

const CreateCollection = () => {
  return (
    <div>

<div className="create-header">
  {/* <header>
    <nav className="navbar navbar-expand-lg navbar-light top-nav">
       
    <div className="container">
          <a className="navbar-brand" href="#"><img src="img/logo.png" className="logo"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-tabs">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="index.html">MARKETPLACE</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="nft's.html">MY NFT'S</a>
              </li>
          
              
              <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CREATE
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="create-page.html">Create NFT</a></li>
            <li><hr className="dropdown-divider"></li>
            <li><a className="dropdown-item" href="#">Create Collection</a></li>
          </ul>
        </li>
               <!-- <li className="nav-item">
                <a className="nav-link" href="nft-page.html">CREATE</a>
              </li> -->
            </ul>
            <form className="d-flex">
               <button className="btn wallet-btn" type="submit">Connect Wallet</button>
              <button className="btn meta-btn" type="submit"> <img className="icon" src="img/meta-mask-lg.png">uhwuh8**********kjksd  </button>
             
            </form>
          </div>
        </div>
      </nav>
    </header>
 */}


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
                             <input style={{display: "none"}} id="icon" type="file" />
                        </label>
                    </div>
                </div>
                </div>



                    <div className="create-head">
                    <h4 className="form-heading">Featured image</h4>
                    <p className="form-para">This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.</p>
                    <div className="form-img-box">

                        <label className="box-img" htmlFor="svg">
                            <img src={ImgIcon.src} className="rounded"/>
                            <input style={{display: "none"}} id="svg" type="file" />
                        </label>

                    </div>
                </div>


                  <div className="create-head">
                    <h4 className="form-heading">Banner image </h4>
                    <p className="form-para">This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended.</p>
                    <div className="form-img-box2">
                        
                      <label className="box-img2" htmlFor="png">
                            <img className="box-img" src={ImgIcon.src}/>
                            <input style={{display: "none"}} id="png" type="file" />
                        </label>
                    </div>
                </div>


                        <div className="form-ipt-sec">
                            <h4 className="name-txt">Name <span className="red-star">*</span></h4>
                            <input type="text" className="form-ipt" placeholder="Item name"/>
                        </div>
            
                         <div className="form-ipt-sec">
                            <h4 className="name-txt">URL</h4>
                            <p className="para-txt">Customize your URL on OpenSea. Must only contain lowercase letters, numbers, and hyphens.</p>
                            <input type="text" className="form-ipt" placeholder="https://opensea.io/collection/"/>
                        </div>
                        
                  

                      <div className="form-ipt-sec">
                            <h4 className="name-txt">Description</h4>
                            <p className="para-txt"><a href="">Markdown</a>  syntax is supported. 0 of 1000 characters used.</p>
                            <textarea type="text" className="form-area" placeholder=""></textarea>
                        </div>
                        
                        <div className="form-ipt-sec">
                            <h4 className="name-txt">Category</h4>
                            <p className="para-txt">Adding a category will help make your item discoverable on OpenSea.
                        
                          </p>
                                                   
                              
                          <button type="button" className="btn category-btn btn-outline-light" > <i className="fa-solid fa-hexagon-image"></i>   Add category</button>
                        </div>

                   
                        <div className="form-ipt-sec">
                            <h4 className="name-txt">Links</h4>
                          <div className="link-ipt">

                            <div className="input-group mt-3" >
                              <label className="input-group-text" style={{borderRadius: "7px 0 0 0", backgroundColor: "white", border: "none"}}>
                                <img src={Web.src}/>
                                </label>
                              <input className="form-selected " placeholder="yoursite.io" style={{borderRadius:"0 7px  0 0", border: "none"}}/>
                            </div>
                            
                            <div className="input-group" >
                              <label className="input-group-text rounded-0 bg-light border-0">
                                  <img src={Discord.src}/></label>
                              <input className="form-selected rounded-0 border-0" placeholder="https://discord.gg/abcdef"/>
                            </div>
                            
                            <div className="input-group" >
                              <label className="input-group-text  rounded-0 bg-light border-0">
                                  <img src={Instagram.src}/></label>
                              <input className="form-selected rounded-0 border-0" placeholder="https://www.instagram.com/YourInstagramHandle"/>
                            </div>
                            
                            <div className="input-group" >
                              <label className="input-group-text rounded-0 bg-light border-0">
                                  <img src={Medium.src}/></label>
                              <input className="form-selected rounded-0 border-0 " placeholder="https://www.medium.com/@YourMediumHandle"/>
                            </div>
                            
                            <div className="input-group border-0 " >
                              <label className="input-group-text bg-light" style={{borderRadius: "0 0 0 7px ", border: "none"}}>
                                  <img src={Telegram.src}/></label>
                              <input className="form-selected bg-light border-0" style={{borderRadius:" 0 0  7px 0",}} placeholder="https://t.me/abcdef"/>
                            </div>


                                    </div>
                                    
                        </div>
            
                        
                         <div className="form-ipt-sec">
                            <h4 className="name-txt">Creator Earnings</h4>
                            <p className="para-txt">Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing. <a href="">Learn more about creator earnings.</a></p>
                          <h5 className="per-txt">Percentage fee</h5>
                            <input type="text" className="form-ipt mt-3" placeholder="e.g. 25"/>
                        </div>


                         <div className="form-ipt-sec">
                            <h4 className="name-txt">Payment tokens </h4>
                            <p className="para-txt">These tokens can be used to buy and sell your items. </p>
                             <button type="button" className="btn eth-btn btn-outline-light" > 
                             <img src={Eth.src} alt="" style={{paddingRight: "5px"}} />   ETH</button>
                            <select type="text" className="form-ipt" placeholder="Add Token">

                              <option>Add Token</option>

                              <option>Add Token</option>

                            </select>
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