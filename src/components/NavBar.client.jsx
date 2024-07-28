import { Link } from '@shopify/hydrogen';
import { fetchSanityData } from '../sanityData.client';
import { Fragment, useEffect, useState } from 'react';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'


export default function NavBar() {

  const [navigationData, setSanityData] = useState([]);
  const [hoveredMenuId, setHoveredMenuId] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  useEffect(() => {
    async function getData() {
      const sanityData = await fetchSanityData(sanityQuery);
      setSanityData(sanityData);
    }
    getData();
  }, []);

  return (
    <div className="customNavbar">

      {/* Desktop */}

      <div className='mainMenu nav-desktop'>
        <ul>
          {navigationData.map((menu) => (
            <li
              className={`menu-${menu._id}`}
              key={menu._id}
              onMouseEnter={() => setHoveredMenuId(menu._id)}
              onMouseLeave={(e) => {
                setTimeout(function(){
                    const submenu = document.querySelector(`.submenu-${menu.id}`);
                    const mainMenuItem = document.querySelector(`.menu-${menu.id}`);                  
                    if (
                      submenu && 
                      !submenu.contains(e.relatedTarget) && 
                      mainMenuItem && 
                      !mainMenuItem.contains(e.relatedTarget)
                    ) {
                      setHoveredMenuId(null);
                    }
                }, 300);
              }}
            >
              {menu.title}
                {hoveredMenuId === menu._id && (
                  <div 
                    className={`submenu-${menu._id} submenu`}
                    onMouseLeave={() => setHoveredMenuId(null)}               
                    >
                    <div className={`wrap`}>
                      <ul>
                        {menu.collectionLinks && menu.collectionLinks.map((collection) => (
                          <li key={collection._id}>
                            <a href={`/collections/${collection.slug}`}>{collection.title}</a>
                          </li>
                        ))}
                        {menu.customLink && (
                          <li>
                            <a href={menu.customUrl}>{menu.customLink}</a>
                          </li>
                        )}
                      </ul>
                      {menu.images && (
                        <div className="menuImages">
                          {menu.images.map((image) => (
                            <img key={image._key} src={image.url} alt="" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </li>
          ))}
          <li>
            <a href="/Blog">Blog</a>
          </li>
        </ul>
      </div>

      {/* Mobile */}

      <div className='mainMenu nav-mobile'>

        <button
          type="button"
          className="mobile-menu-bars"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-6 w-6 text-black" aria-hidden="true" />
        </button> 

        <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setMobileMenuOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Menu</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      {navigationData.map((menu, i) => (
                        <Disclosure as="div" key={`wrap-${menu._id}-${i}`} className="border-t border-gray-200 px-4 py-6">
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">{menu.title}</span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {menu.collectionLinks && menu.collectionLinks.map((collection, i) => (
                                    <div key={`collection-${collection._id}-${collection.title}-${i}`}  className="flex items-center cursor-pointer">
                                      <a href={`/collections/${collection.slug}`}>{collection.title}</a>
                                    </div>
                                  ))}
                                  {menu.customLink && (
                                    <div key={menu.customLink}  className="flex items-center cursor-pointer">
                                      <a href={menu.customUrl}>{menu.customLink}</a>
                                    </div>                                  
                                  )}                                
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                      <a href="/Blog">
                        <div className="flex items-center cursor-pointer border-t border-gray-200 px-4 py-6 text-black">
                          <span>Blog</span>
                        </div>
                      </a>                           
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>        
      </div>

    </div>
  );
}

const sanityQuery = `
*[_type == "megaMenu"]{
  _id,
  title,
  collectionLinks[]->{
    _id,
    "title": store.title,
    "slug": store.slug.current,
    "handle": store.handle,
    "imageUrl": store.imageUrl.asset->url
  },
  customLink,
  customUrl,
  images[]{
    _key,
    "url": asset->url
  }
}
`;