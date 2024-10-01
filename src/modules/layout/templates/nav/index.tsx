import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchBox from "@modules/search/components/search-box"
import { InstantSearch } from "react-instantsearch-hooks-web"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import { MagnifyingGlassMini, ShoppingCart, User } from "@medusajs/icons"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBoxWrapper from "@modules/search/components/search-box-wrapper"
import { RxAvatar } from "react-icons/rx";

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  const SideMenuItems = {

    Produse: "/store",
    Cursuri: "https://lorenalash.ro/cursuri",
    "Despre Noi": "https://lorenalash.ro",
    Contact: "https://lorenalash.ro",
  }

  return (
<div className="sticky top-0 inset-x-0 z-50 group">
  <header className="relative h-24 mx-auto border-b duration-200 bg-white border-ui-border-base">
    <nav className="flex flex-col content-container txt-xsmall-plus text-ui-fg-subtle items-center justify-center w-full h-full text-small-regular">
    <div className="flex justify-center items-center gap-[16px] h-full w-[900px]">
  <div className="flex-1 flex items-center justify-center">
    <LocalizedClientLink
      href="/"
      className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
      data-testid="nav-store-link"
    >
      LorenaLash
    </LocalizedClientLink>
  </div>
  <div className="h-[40px] w-[400px] border-[1px] border-black" />

  <div className="flex items-center gap-x-6 flex-1 justify-center">
    <LocalizedClientLink
      className="flex flex-row items-center gap-1 text-lg hover:text-ui-fg-base "
      href="/account"
      data-testid="nav-account-link"
    >
      <span className="text-[24px]"><RxAvatar /></span>
      <span>Contul Meu</span>
    </LocalizedClientLink>
    <Suspense
      fallback={
        <LocalizedClientLink
          className="hover:text-ui-fg-base flex flex-row gap-1 "
          href="/cart"
          data-testid="nav-cart-link"
        >
          <ShoppingCart />
          <span>Cos (0)</span>
        </LocalizedClientLink>
      }
    >
      <CartButton />
    </Suspense>
  </div>
</div>
<span className="h-[1px] w-screen bg-gray-300" />

      <ul className="flex gap-[16px] items-center justify-center">
        {Object.entries(SideMenuItems).map(([name, href]) => {
          if (name === "Contact") {
            return (
              <li key={name}>
                <a
                  href={href}
                  className="text-lg leading-10 hover:text-ui-fg-disabled"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`${name.toLowerCase()}-link`}
                >
                  {name}
                </a>
              </li>
            )
          }
          return (
            <li key={name}>
              <LocalizedClientLink
                href={href}
                className="text-lg leading-10 hover:text-ui-fg-disabled"
                data-testid={`${name.toLowerCase()}-link`}
              >
                {name}
              </LocalizedClientLink>
            </li>
          )
        })}
      </ul>
    </nav>
  </header>
</div>

  )
}
