__imgSource=${1:-icon.png}
__imgDest=${__imgSource%.*}
__imgRepository=${2:-Icons}

# 
[ -f ${__imgSource} ] ||  exit 0
[ -d ${__imgRepository} ] || mkdir -p ${__imgRepository}

#
__imgSize=(
   "24x1" "48x1" "64x1" "96x1" "128x1"
   "20x1" "20x2" "20x3"
   "29x1" "29x2" "29x3"
   "40x1" "40x2" "40x3"
   "60x2" "60x3"
   "76x1" "76x2"
   "83.5x2" "1024x1"
)

#
for eSize in ${__imgSize[*]}; do
   size=${eSize%x*}
   scale=${eSize##*x}
   resize=$(bc <<< ${size}*${scale} )
   echo "resizing ${__imgSource} to ${size}x${size}@${scale}"
   convert ${__imgSource} \
      -resize ${resize}x${resize} \
      -unsharp '1.5x1+0.7+0.02' \
      ${__imgRepository}/Icon-${__imgDest}-${size}x${size}@${scale}x.png
done
