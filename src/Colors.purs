module D3.Colors where

import Data.Maybe (Maybe)
import Color (Color, rgb, fromHexString, toHexString) as C

type Color = C.Color

rgb :: Int -> Int -> Int -> Color
rgb = C.rgb

fromHexString :: String -> Maybe Color
fromHexString = C.fromHexString

toHexString :: Color -> String
toHexString = C.toHexString
