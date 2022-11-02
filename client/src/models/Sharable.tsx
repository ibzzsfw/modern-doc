interface Sharable {
  shareDate?: Date;

  share(): void;
  unshare(): void;
}