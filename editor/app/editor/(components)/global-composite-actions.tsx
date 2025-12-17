import { useClipStore } from "@/app/store/clip-store"
import { Box } from "@react-three/drei"

const DestinationInCutOutsComponent = () => {
const { boxSize,destinationInCutOuts } = useClipStore()
console.log(destinationInCutOuts)
  return (
    <>
           
      {
        destinationInCutOuts.length>0&&destinationInCutOuts.map((x) => {
          console.log('heleo')
          return (
            <Box
              key={x.uuid}
              args={boxSize}
              position={[0, 0, 0]}
            >
              <meshBasicMaterial
                map={x}
                transparent
              />
            </Box>
          )
        })
      } 
    </>
  )
}

export default DestinationInCutOutsComponent
