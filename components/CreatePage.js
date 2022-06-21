import React from 'react'
import ImgIcon  from '../public/img-icon.svg'
import Exclamation from '../public/exclamation.png'
import ThreeLines from '../public/three-lines.PNG'
import Plus from '../public/plus.png'
import Exclamation1 from '../public/exclamation1.png'
import { Tooltip } from '@mui/material';



const CreatePage = () => {

  return (


    <div>
  <div className="create-header">
{/*       
  <header>
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
            <li><a className="dropdown-item" href="#">Create NFT</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="Create-collection.html">Create Collection</a></li>
          </ul>
        </li>
              
            </ul>
            <form className="d-flex">
               <button className="btn wallet-btn" type="submit">Connect Wallet</button>
              <button className="btn meta-btn" type="submit"> 
              <img className="icon" src="img/meta-mask-lg.png">uhwuh8**********kjksd  </button>
             
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
                <h2 className="create-heading">  Create New Item</h2>
                <p className="small-txt"> <span className="red-star">*</span> Required Fields</p>

                </div>

                <form action="" className="create-form">

                  <div className="create-head">
                  
                    <h4 className="form-heading">Image, Video, Audio, or 3D Model <span className="red-star">*</span></h4>
                    <p className="form-para">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
                    <div className="form-img-box">

                        <label className="box-img" type="jpg">
                            <img src={ImgIcon.src}/>
                            <input style={{display:"none"}} id="jpg" type="file"/>
                        </label>

                    </div>

                    </div>
                        <div className="form-ipt-sec mt-1">
                            <h4 className="name-txt">Name <span className="red-star">*</span></h4>
                            <input type="text" className="form-ipt" placeholder="Item name"/>
                        </div>
            
                         <div className="form-ipt-sec">
                            <h4 className="name-txt">External link</h4>
                            <p className="para-txt">OpenSea will include a link to this URL on this item&apos;s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</p>
                            <input type="text" className="form-ipt" placeholder="https://yoursite.io/item/123"/>
                        </div>
                        
                         <div className="form-ipt-sec">
                            <h4 className="name-txt">Preview Length</h4>
                            <p className="para-txt">Manage the length of preview for audio or video file here.</p>
                            <div className="radio-btn-sec">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        15 Sec
                                    </label>
                                </div>

                                    <div className="form-check form-checker">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            30 Sec
                                        </label>
                            </div>
                     </div>
                     </div>

                      <div className="form-ipt-sec">
                            <h4 className="name-txt">Description</h4>
                            <p className="para-txt">The description will be included on the item&apos;s detail page underneath its image. Markdown syntax is supported.</p>
                            <textarea type="text" className="form-area" placeholder="Provide a detailed description of your item"></textarea>
                        </div>
                        
                        <div className="form-ipt-sec">
                            <h4 className="name-txt">Collection</h4>
                              <div className="tooltip"  id="tooltip" style={{display:"none"}}>
                                <p className="move m-0" > Moving items to a different collection may take up to 30 minutes. You can <a href=""> manage your collections here.</a></p>

                              </div>
                            <p className="para-txt">This is the collection where your item will appear.


                             
                           
                            <img className="excllamation" id="termsopen"  src={Exclamation.src} height="18px"   />
                        
            

                 </p>
                 
                            <input type="text" className="form-ipt" placeholder="Provide a detailed description of your item"/>
                        </div>

                        <div className="form-ipt-sec">
                            <div className="txt-area">
                                 <img src={ThreeLines.src} height="20px" width="18.5px"/>
                                 <div className="content-txt">
                            <h4 className="name-txt">Properties</h4>
                            <p className="para-txt">Textual traits that show up as rectangles</p></div>
                            <img className="plus-btn  me-auto" src={Plus.src} height="35px"/>
                            </div>

                            <div className="form-ipt-part">
                                <div className="name-box">
                                    <h4 className="n-txt">Name</h4>
                                    <h2 className="p-txt" >Property</h2>
                                </div>
                                  <div className="name-box">
                                    <h4 className="n-txt">Name</h4>
                                    <h2 className="p-txt" >Property</h2>
                                </div>
                            </div>
                        </div>

                         <div className="form-ipt-sec">
                            <h4 className="name-txt">Supply</h4>
                          
                            <Tooltip title="The number of items that can be minted. No gas cost to you!" placement="top-end" target="tooltip" >

                             <img className="excllamation"  src={Exclamation.src} height="18px"   data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top"/> 
                            </Tooltip>
                             

                            <input type="text" className="form-ipt" placeholder="1"/>
                        </div>

                         <div className="form-ipt-sec">
                            <h4 className="name-txt">Freeze metadata     
                            <img className="excllamation"   src={Exclamation1.src} height="20px"   data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top"/></h4>
                            <p className="para-txt">Freezing your metadata will allow you to permanently lock and store all of this item&apos; content in decentralized file storage.</p>
                            <input type="text" className="form-ipt" placeholder="To freeze your metadata, you must create your item first."/>
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



</div>
  )
}

export default CreatePage