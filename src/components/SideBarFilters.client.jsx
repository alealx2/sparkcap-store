
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import ProductCard from './ProductCard.client'

const sortOptions = [
  // { name: 'Most Popular', href: '#', current: true },
  // { name: 'Best Rating', href: '#', current: false },
  { name: 'Default', href: '#', current: true },
  { name: 'Newest', href: '#', current: false },
  { name: 'Oldest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideBarFilter({data}) {

  //HANDEL FILTERS
  //We set a state hook for our mobile filter floating menu
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  //We set a hook for our custom filtering and sorting functionalities
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([...data]);

  //Constructs filtering logic
  const customFilters = [];
  const filters = data.map((filter) => {
    const options = filter.options.map((option) => {
      const existingFilter = customFilters.find((filter) => filter.name === option.name);

      if (!existingFilter) {
        const newFilter = {
          id: option.name,
          name: option.name,
          options: option.values.map((value) => ({
            value: value,
            label: value,
            checked: false,
          })),
        };

        customFilters.push(newFilter);
      } else {
        option.values.forEach((value) => {
          const existingOption = existingFilter.options.find((filterOption) => filterOption.value === value);

          if (!existingOption) {
            existingFilter.options.push({
              value: value,
              label: value,
              checked: false,
            });
          }
        });
      }
    });
  });

  //handles filtering
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => {
      const existingFilter = prevFilters.find((filter) => filter.name === filterName);

      if (existingFilter) {
        const updatedFilters = prevFilters.map((filter) => {
          if (filter.name === filterName) {
            const updatedValues = filter.values.includes(value)
              ? filter.values.filter((v) => v !== value)
              : [...filter.values, value];

            return { name: filterName, values: updatedValues.length > 0 ? updatedValues : [] };
          } else {
            return filter;
          }
        });

        return updatedFilters.filter((filter) => filter.values.length > 0);
      } else {
        return [...prevFilters, { name: filterName, values: [value] }];
      }
    });
  };

  //handles sorting
  const updateFilteredAndSortedProducts = () => {
    let filteredData = [...data];

    filteredData = filteredData.filter((product) => {
      return selectedFilters.length === 0 || selectedFilters.some((filter) => {
        const productOptions = Array.isArray(product.options) ? product.options : [];
        const productOption = productOptions.find((option) => option.name === filter.name);
        return productOption && filter.values.some((value) => productOption.values.includes(value));
      });
    });

    switch (selectedSort.name) {
      case 'Newest':
        filteredData = filteredData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      case 'Oldest':
        filteredData = filteredData.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        break;        
      case 'Price: Low to High':
        filteredData = filteredData.sort((a, b) => a.variants.nodes[0].price.amount - b.variants.nodes[0].price.amount);
        break;
      case 'Price: High to Low':
        filteredData = filteredData.sort((a, b) => b.variants.nodes[0].price.amount - a.variants.nodes[0].price.amount);
        break;
      default:
        // Default sorting logic
        break;
    }

    setFilteredAndSortedProducts(filteredData);
  };

  useEffect(() => {
    updateFilteredAndSortedProducts();
  }, [selectedFilters, selectedSort, data]);


  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {/* <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul> */}

                    {customFilters.map((filter, i) => (
                      <Disclosure as="div" key={`wrap-${filter.id}-${i}`} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{filter.name}</span>
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
                                {filter.options.map((option, optionIdx) => (
                                  <div key={`option-${filter.id}-${option.value}-${i}`}  className="flex items-center cursor-pointer">
                                    <input
                                      id={`filter-mobile-${filter.id}-${optionIdx}`}
                                      name={`${filter.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      // defaultChecked={option.checked}
                                      className="cursor-pointer h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      checked={selectedFilters.some(
                                        (selectedFilter) =>
                                          selectedFilter.name === filter.name && selectedFilter.values.includes(option.value)
                                      )}
                                      onChange={() => handleFilterChange(filter.name, option.value)}                                                                        
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${filter.id}-${optionIdx}`}
                                      className="cursor-pointer ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto">
          <div className="flex items-end justify-between border-b border-gray-200 pb-6">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1> */}

            <div className="flex items-end">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              onClick={() => setSelectedSort(option)}
                              className={classNames(
                                option === selectedSort ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm cursor-pointer'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className=" bg-white hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3> */}
                {/* <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {customFilters.map((filter, i) => (
                  <Disclosure as="div" key={`wrap-${filter.id}-${i}`}  className="border-b border-gray-200 py-6 px-4">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{filter.name}</span>
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
                          <div className="space-y-4">
                            {filter.options.map((option, optionIdx) => (
                              <div key={`option-${filter.id}-${option.value}-${i}`} className="flex items-center">
                                <input
                                  id={`filter-${filter.id}-${optionIdx}`}
                                  name={`${filter.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  // defaultChecked={option.checked}
                                  className="cursor-pointer h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={selectedFilters.some(
                                    (selectedFilter) =>
                                      selectedFilter.name === filter.name && selectedFilter.values.includes(option.value)
                                  )}
                                  onChange={() => handleFilterChange(filter.name, option.value)}
                                                                
                                />
                                <label
                                  key={option.value}
                                  htmlFor={`filter-${filter.id}-${optionIdx}`}
                                  className="cursor-pointer ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">

                <div className="product-grid">
                {filteredAndSortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product}></ProductCard>
                    ))}
                </div>                                

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
