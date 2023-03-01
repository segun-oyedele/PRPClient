import Image from 'next/image';
import PropTypes from 'prop-types';

export const HomeCardItem = ({ title, description, iconName }) => {
  return (
    <div className="flex flex-col justify-between w-full max-w-md gap-10 px-8 py-4 rounded-2xl home_card-report">

      <div>
        <Image
          alt="Card icon"
          className="rounded-lg"
          height={80}
          src={`${process.env.iisPath}/img/icons/${iconName}.svg`}
          title="Card icon"
          width={80}
        />
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-semibold home_card-title">{title}</h3>
        <p className="mt-2 home_card-description">{description}</p>
      </div>

    </div>
  );
};

HomeCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
