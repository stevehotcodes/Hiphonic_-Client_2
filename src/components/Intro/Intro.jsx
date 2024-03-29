import React from 'react'
import '../Intro/Intro.scss'

import location from '../../assets/location-outline.svg'
import calendar1 from  '../../assets/calendar.png'
import calendar2 from  '../../assets/calendar.png'
import link_photo from '../../assets/link-outline.svg'

const Intro=({profile})=>{
    const IntroArray=[
        {
            image_icon:location,
            details:profile.location

        },
        {
            image_icon:calendar1,
            details:'Binford Ltd.'

        },
        {
            image_icon:calendar2,
            details:'29 Spetemeber 2017'

        },
        {
            image_icon:link_photo,
            details:profile.tagname

        },

    ]





     return(
        <div className='intro-container'>
            <div>
                <h4>Intro</h4>
            </div>
            <p>I am experienced joiner with well developed skills</p>
    
            {IntroArray&&
            IntroArray.map((item,index)=>{
                const{image_icon,details}=item
               return(
                <div className='intro-item' key={index}>
                        <img src={image_icon} alt="" />
                        <span>{details}</span>
                </div>
               )

            })
            
            }
        </div>
    )
}

export default Intro