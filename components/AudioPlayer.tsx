interface AudioPlayerProps {
  audioUrl: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = props => {
  return (
    <div>
      <audio controls>
        <track kind='captions' />
        <source src={props.audioUrl ?? ''} type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
