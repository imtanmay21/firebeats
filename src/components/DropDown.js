import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ChevronDoubleDownIcon } from 'react-native-heroicons/outline';

const DropDown = ({label, options, sort}) => {
  const [showOptions, setShowOptions] = useState(false);

  const sortByOption = (option) => {
    setShowOptions(false);
    sort(option)
  }

  return (
    <View className="mb-3 relative flex-1 mr-2">
        <TouchableOpacity
          onPress={() => setShowOptions(!showOptions)}
          className="p-4 bg-white shadow-md rounded-lg  flex-row items-center justify-between"
        >
          <Text>{label}</Text>
          <ChevronDoubleDownIcon size={20} color="#000000" />
        </TouchableOpacity>

        {/* Options */}
        {showOptions && (
          <View className="bg-white p-5 space-y-4">
            {options.map((option, index) => (
              <TouchableOpacity
                onPress={() => sortByOption(option)}
                key={index}
              >
                <Text>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
  )
}

export default DropDown