
  export class ReviewItemListingModel {
    reviews: Array<ReviewItemModel> = [
      new ReviewItemModel(),
      new ReviewItemModel(),
      new ReviewItemModel()
    ];
  
    constructor(readonly isShell: boolean, reviews?: Array<ReviewItemModel>) {
      if (reviews) {
        this.reviews = reviews;
      }
    }
  }

export class ReviewItemModel {
    author_id: string;
    profile_photo_url: string;
    author_name: string;
    rating: number;
    text: string;
    place_id: string;
    review_date: Date;
  }
  export class ReviewModel {
    author_id: string;
    profile_photo_url: string;
    author_name: string;
    rating: number;
    text: string;
    place_id: string;
    review_date: Date;
    constructor(readonly isShell: boolean) { }
  }
  