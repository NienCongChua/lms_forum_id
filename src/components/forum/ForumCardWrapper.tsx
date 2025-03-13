
import React from 'react';
import { Link } from 'react-router-dom';
import ForumCard from './ForumCard';

// Define the props type based on what ForumCard accepts
type ForumCardProps = React.ComponentProps<typeof ForumCard>;

const ForumCardWrapper: React.FC<ForumCardProps> = (props) => {
  return (
    <Link to={`/forums/${props.id}`} className="block hover:no-underline">
      <ForumCard {...props} />
    </Link>
  );
};

export default ForumCardWrapper;
