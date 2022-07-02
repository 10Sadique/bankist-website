'use strict'

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

const nav = document.querySelector('.nav')


///////////////////////////////////////
//////////   Modal window   ///////////
///////////////////////////////////////

const openModal = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal()
    }
})

//////////////////////////////////////////
/////////   Smooth Scrolling    //////////
//////////////////////////////////////////

btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect()
    // console.log(s1coords)

    // console.log(e.target.getBoundingClientRect())

    // console.log(
    //     'Current scroll point (X/Y)',
    //     window.pageXOffset,
    //     window.pageYOffset
    // )

    // Scrolling
    // window.scrollTo(
    //     s1coords.left + window.pageXOffset,
    //     s1coords.top + window.pageYOffset
    // )

    // Smooth Scrolling
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })

    // Modern Way of Smooth Scrolling
    section1.scrollIntoView({ behavior: 'smooth' })
})

//////////////////////////////////////////
/////////   Page Navigation    ///////////
//////////////////////////////////////////

// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function (e) {
//         e.preventDefault()
//         const id = this.getAttribute('href')
//         console.log(id)
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//     })
// }) 

// This is very unefficient way of Event Handling... Beacuse for n elements there will be n number of call-back function genrated. This problem can be solved by Event Delegation

// Event Delegation Steps:
// 1. Add Event listener to the common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault()
    
    // Matching Strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})

//////////////////////////////////////////
///////     Tabbed Components    /////////
//////////////////////////////////////////

tabsContainer.addEventListener('click', function (e) {
    let clicked = e.target.closest('.operations__tab')

    // Guard clause
    if (!clicked) return

    // Removing Active Classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    tabsContent.forEach(t => t.classList.remove('operations__content--active'))
    
    // Active Tab
    clicked.classList.add('operations__tab--active')

    // Active Content Area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//////////////////////////////////////////
//////     Menu Fade Animation    ////////
//////////////////////////////////////////

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')
        
        siblings.forEach(el => {
            if (el !== link) {
                el.style.opacity = this
            }
        })
        logo.style.opacity = this
        // here the this keyword is the argument opactiy
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

//////////////////////////////////////////
//////     Sticky Navigtion       ////////
//////////////////////////////////////////

// Traditional way... but not very efficient for mobile devices.

// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords)

// window.addEventListener('scroll', function () {
//     console.log(window.scrollY)
//     if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
//     else nav.classList.remove('sticky')
// })

// Intersection Observer API
const header = document.querySelector('.header')

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
    const [entry] = entries
    if (!entry.isIntersecting) {
        nav.classList.add('sticky')
    } else nav.classList.remove('sticky')
    
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
})
headerObserver.observe(header)

//////////////////////////////////////////
//////     Reveal Section         ////////
//////////////////////////////////////////

const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
    const [entry] = entries
    
    if (!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})

allSections.forEach(function (section) {
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})