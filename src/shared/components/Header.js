import { Navbar } from './';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { navLinks } from '../data';
import { useEffect, useState } from 'react';

export const Header = () => {
  
  const router = useRouter();
  const [isActive, setIsActive] = useState(router.pathname === navLinks[0].navPath);

  useEffect(() => {
    setIsActive(router.pathname === navLinks[0].navPath);
  }, [router.pathname]);

  return (
    <header className="sticky top-0 z-10 md:top-auto md:static md:z-auto header-tag primary-blue">
      <div className="container flex items-center h-full min-w-full p-5 md:p-0 md:px-4">
        { isActive ?
          <a className="flex items-center gap-3 cursor-default">
            <Image
              alt='Last Mile Logo'
              className="w-16"
              width={106}
              height={50}
              src={`${process.env.iisPath}/img/last_mile_logo.png`}
              title="Last-Mile-Logo"
            />
          </a>
          :
          <Link href={`${navLinks[0].to}`}>
            <a className="flex items-center gap-3">
              <Image
                alt='Last Mile Logo'
                className="w-16"
                width={106}
                height={50}
                src={`${process.env.iisPath}/img/last_mile_logo.png`}
                title="Last-Mile-Logo"
              />
            </a>
          </Link>
        }

        <Navbar />
      </div>
    </header>
  );
};
