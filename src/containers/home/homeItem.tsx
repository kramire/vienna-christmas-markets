import CallToAction from './callToAction';

interface Props {
  title: string;
  description: string;
  actionLabel: string;
  handleClick: () => void;
}

const HomeItem = ({ title, description, actionLabel, handleClick }: Props) => {
  return (
    <div className="result-item" onClick={handleClick}>
      <h2>{title}</h2>
      <p
        style={{
          marginBottom: '8px',
          fontSize: '13px',
          lineHeight: '20px',
        }}
      >
        {description}
      </p>
      <CallToAction label={actionLabel} />
    </div>
  );
};

export default HomeItem;
