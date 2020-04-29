import { IMAGE_ENTRY, VIDEO_ENTRY, OTHER_ENTRY } from "../../constants";
import SinglePiece from "../../models/singlePiece"

export const PieceBase = {
  pieceType(piece) {
    return piece.getSinglePiece().then(singlePiece => {
      if (singlePiece.pieceType === IMAGE_ENTRY) {
        return "PHOTO";
      } else if (singlePiece.pieceType === VIDEO_ENTRY) {
        return "VIDEO";
      } else if (singlePiece.pieceType === OTHER_ENTRY) {
        return "OTHER";
      }
    }) 
  }
};

export default {
  Piece: {
    __resolveType(data, context, info) {
      return SinglePiece.findOne({where: {id: data.pieceId}}).then(piece => {
        // Identifies for GraphQL which concrete instance of Piece this object is.
        if (piece.pieceType === IMAGE_ENTRY) {
          return info.schema.getType('PhotoPiece')
        } else if (piece.pieceType === VIDEO_ENTRY) {
          return info.schema.getType('VideoPiece')
        } else if (piece.pieceType === OTHER_ENTRY) {
          return info.schema.getType('OtherMediaPiece')
        }
        throw new Error("Unknown piece type")
      })
    }
  }
};
