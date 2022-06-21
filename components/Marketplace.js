import React , { useEffect, useState } from 'react'
import axios from 'axios'
import $ from 'jquery'
import VideoIcon from '../public/video-icon.svg'
import VideoImg from '../public/video-img.PNG'
import Search from '../public/search.svg'
import Tline1 from '../public/t-line1.png'
import MenuIcon from '../public/menu-icon.png'
import { ToggleButton,Modal } from 'react-bootstrap'

import HomeMap from '../components/ui/HomeMap'
import { LinearProgress } from '@mui/material'
import { useAppContext } from '../context/GlobalState'
import {useFilterContext} from '../context/GlobalState'


const Marketplace = ({props}) => {


const {filterArray,setFilterArray} = useFilterContext({list: [0,0,0,0,0,0,0,0,0]})
  const [options,setOptions] =useState(props.data)
  const [open,setOpen]=useState(false)
  const {active,setActive} = useAppContext()
// const [active,setActive] = useState(false)
  const [values,setValue] =useState([])
const [filters,setFilters] =useState(null)
const [search,setSearch] =useState(null)
const [priceFilter,setPriceFilter] =useState(null)
  const [checked, setChecked] = useState(false);
  const [onSaleBtn, setOnSaleBtn] = useState(false)
  const [newBtn, setNewBtn] = useState(false)
  const [hasOffersBtn, setHasOffersBtn] = useState(false)
  const [buyNowBtn, setBuyNowBtn] = useState(false)


////////////////////////////////



// const [filterArray,setFilterArray] = useState([0,0,0,0,0,0,0,0,0])
// setFilterArray({list: [0,0,0,0,0,0,0,0,0]})

const handleCloseModal = () => setOpen(false);
let r=0;
useEffect(  () => {
if(r === 0){
  setFilterArray({list: [0,0,0,0,0,0,0,0,0]})

}
r++
  console.log(filterArray)
},[])

useEffect(()=>{
  setFilters(null);

  if (onSaleBtn|| newBtn||hasOffersBtn||buyNowBtn === true) {
   setFilters( {
      onSale: onSaleBtn,
      newListing: newBtn,
      hasOffer: hasOffersBtn,
      buyNow: buyNowBtn,
    })
  } else {
    filters = null;
  }
},[onSaleBtn, newBtn,hasOffersBtn,buyNowBtn])
function pageNav(){
$(document).ready(function () {
$("#menu-icon").click(function(){
  $('.left-side').show (100)
  // ('slide', {direction: 'left'},300 );
 });

  $("#close-btn").click(function(){   
    $(".left-side").hide(100);
}); 

    });
  }


useEffect(() => {
  setActive(false)
    // homeNft()
    pageNav()

  },[]);

  return (

  
  <div>
  <Modal
        show={active}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <LinearProgress
          style={{ width: "100%", height: "0.3rem" }}
          color="secondary"
        />
      </Modal>
<div className="page-header">

  
    <section className="filter-page">
      <div className="container">
        <div className="row">
          <div className=" left-side" id="left-side" >
          
            <section className="top-head">
              <div className="filter-sec"> 
                <div className="adv-sec">
                  <img src={Tline1.src} className="t-line" alt="..."/>
                  <h4 className="t-text">Advance filters</h4>
                </div>
                  <h2 className="btn-close" id="close-btn">x</h2> 
              </div>
             
             <div className='button-sec'>

              <ToggleButton
        className=" lable-btn" 
        id="toggle-check"
        type="checkbox"
        variant="outline-light"
        checked={onSaleBtn}
        value="1"
        onChange={(e) => setOnSaleBtn(e.currentTarget.checked)}
      >
        On Sale
      </ToggleButton>

      <ToggleButton
        className=" lable-btn1"
  
        id="toggle-check1"
        type="checkbox"
        variant="outline-light"
        checked={newBtn}
        value="2"
        onChange={(e) => setNewBtn(e.currentTarget.checked)}
      >
        New
      </ToggleButton>
      <ToggleButton
        className=" lable-btn"
        
        id="toggle-check2"
        type="checkbox"
        variant="outline-light"
        checked={hasOffersBtn}
        value="3"
        onChange={(e) => setHasOffersBtn(e.currentTarget.checked)}
      >
        Has Offers
      </ToggleButton>
      <ToggleButton
        className="lable-btn1"
        id="toggle-check3"
        type="checkbox"
        variant="outline-light"
        checked={buyNowBtn}
        value="4"
        onChange={(e) => setBuyNowBtn(e.currentTarget.checked)}
      >
       Buy Now 
      </ToggleButton>
      </div>

              <section className="button-sec">
                
             
              </section>
            </section>


            <section className="input-part">
                <div className="input-content">
                  <h4 className="input-text">Rarity / Background</h4>
                  <select 
                    onChange={(e) => {
// e.preventDefault()
                      if (e.target.value === "Select") {
                        let arr = filterArray.list;
                        arr.splice(0,1,0);
                        setFilterArray({list:arr});
                        // setBackgroundOption(0);
                        return;
                      }
                      let arr = filterArray.list;
                      arr.splice(0,1,e.target.value);
                      setFilterArray({list:arr});
              
                      // alert(value)
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 1) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text"> Accessories Body</h4>
                  <select
                    onChange={(e) => {
                      let arr = filterArray.list;

                      if (e.target.value === "Select") {
                        // setValue([]);
                        // setBodyOption(0);
                        
                        arr.splice(1,1,0);
                        setFilterArray({list:arr});
                        return;
                      }
                      arr.splice(1,1,e.target.value);
                      setFilterArray({list:arr});
                      // setBodyOption(e.target.value);
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 2) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text">Accessories Face</h4>
                  <select
                    onChange={(e) => {
                      let arr = filterArray.list;
                      if (e.target.value === "Select") {
                        arr.splice(2,1,0);
                        setFilterArray({list:arr});
  
                        return;
                      }
                      arr.splice(2,1,e.target.value);
                      setFilterArray({list:arr});
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 3) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text">Shirt color</h4>
                  <select
                    onChange={(e) => {
                      let arr = filterArray.list;
                      if (e.target.value === "Select") {
                        arr.splice(3,1,0);
                        setFilterArray({list:arr});

                        // setMouthOption(0);

                        return;
                      }
                      arr.splice(3,1,e.target.value);
                      setFilterArray({list:arr});

                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 4) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text">Eye + expression</h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value === "Select") {
                        let arr = filterArray.list;
                      arr.splice(4,1,0);
                      setFilterArray({list:arr});
                        return;
                      }
                      let arr = filterArray.list;
                      arr.splice(4,1,e.target.value);
                      setFilterArray({list:arr});
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 5) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text">Body </h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value === "Select") {
                        let arr = filterArray.list;
                      arr.splice(5,1,0);
                      setFilterArray({list:arr});
                        return;
                      }
                      let arr = filterArray.list;
                      arr.splice(5,1,e.target.value);
                      setFilterArray({list:arr});
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 6) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text">Tattoo</h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value === "Select") {
                        let arr = filterArray.list;
                        arr.splice(6,1,0);
                        setFilterArray({list:arr});

                        return;
                      }
                      let arr = filterArray.list;
                      arr.splice(6,1,e.target.value);
                      setFilterArray({list:arr});
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 7) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text">Skin tone</h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value === "Select") {
                        let arr = filterArray.list;
                        arr.splice(7,1,0);
                        setFilterArray({list:arr});
                        return;
                      }
                      let arr = filterArray.list;
                      arr.splice(7,1,e.target.value);
                      setFilterArray({list:arr});
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 8) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="input-content">
                  <h4 className="input-text">Haircut & color</h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value === "Select") {
                        let arr = filterArray.list;
                        arr.splice(8,1,0);
                        setFilterArray({list:arr});
                        return;
                      }
                      let arr = filterArray.list;
                      arr.splice(8,1,e.target.value);
                      setFilterArray({list:arr});
                    }}
                  >
                    <option defaultactivekey>Select</option>
                    {options.map((opt) => {
                      if (opt.typeOfProperty === 9) {
                        return (
                          <option value={opt.id}>{opt.description}</option>
                        );
                      }
                    })}
                  </select>
                </div>
              </section>
          </div>


          <div className="right-side" >         
            <div className="volume-sec">
             <img id="menu-icon" src={MenuIcon.src} alt=""/>

             <div className="round-sec">
             <input type="text"       onChange={(e) => {
                      setSearch(e.target.value);
                    }} className="search-ipt" placeholder="Enter Keywords for NFTs" /> 
              </div>
             <div className="round-box">
               <img src={Search.src}/>
             </div>
             <select
                    onChange={(e) => {
                      setPriceFilter(e.target.value);
                    }}
                    className="nft-select"
                  >
                    {/* <option defaultactivekey >Price</option> */}
                    <option value="0">Select</option>
                    <option value="1">Price: Low to high</option>
                    <option value="2">Price: High to Low</option>
                    <option value="3">Most Viewed</option>
                    <option value="4">Recently Sold</option>
                  </select>
            </div>


            <div className="card-head">
            {/* // Lazy load the YouTube player */}

<HomeMap   types={filterArray}
                  filters={filters}
                  search={search}
                  priceFilter={priceFilter}/>

         

           
</div>
          </div>
          </div>
        </div>
      </section> 





      
</div>
 
  

</div>
  )
}

export default Marketplace