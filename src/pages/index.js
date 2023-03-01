import Image from 'next/image';
import { cardLinks } from '../shared/data';
import { Layout } from '../shared/components';
import { HomeCardContainer } from '../components/home';

export default function Home() {
  return (
    <Layout
      headTitle="Home"
    >
      <main className="my-10 landing">
        <section className="flex flex-col items-center w-full gap-20 px-5">
          <div className="flex flex-col items-center w-full gap-32 text-center justify-evenly xl:flex-row">
            <h1 className="home_text raleway-eb">Manage all reports and partners in one place</h1>
            <div className="relative h-56 w-72 home__hero-image xl:w-auto xl:h-auto">
              <Image
                className="img-home"
                src={`${process.env.iisPath}/img/hero_img.svg`}
                layout="fill"
                alt="Box image"
                title="Box image"
                priority="true"
              />
            </div>
          </div>

          <HomeCardContainer
            items={ cardLinks }
          />
        </section>
      </main>
    </Layout>
  );
};
