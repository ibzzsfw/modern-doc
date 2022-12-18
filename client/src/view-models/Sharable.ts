interface Sharable {
  shareData: Date;

  share: () => void;
  unshare: () => void;
}

export default Sharable;