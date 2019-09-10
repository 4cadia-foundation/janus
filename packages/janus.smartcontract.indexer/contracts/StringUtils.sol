pragma solidity >= 0.4.21 < 0.6.0;

library StringUtils {
    /// @dev Does a byte-by-byte lexicographical comparison of two strings.
    /// @return a negative number if `_a` is smaller, zero if they are equal
    /// and a positive numbe if `_b` is smaller.
    function compare(string memory _a, string memory _b) public pure returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);

        uint minLength = a.length < b.length ? a.length : b.length;

        for (uint i = 0; i < minLength; i ++) {
            if (a[i] < b[i]) {
                return -1;
            } else if (a[i] > b[i]) {
                return 1;
            }
        }

        if (a.length < b.length) {
            return -1;
        } else if (a.length > b.length) {
            return 1;
        } else {
            return 0;
        }
    }

    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string memory _a, string memory _b) public pure returns (bool) {
        return compare(_a, _b) == 0;
    }

    /// @dev Finds the index of the first occurrence of _needle in _haystack
    function indexOf(string memory _haystack, string memory _needle) public pure returns (int) {
        bytes memory h = bytes(_haystack);
        bytes memory n = bytes(_needle);

        if(h.length < 1 || n.length < 1 || (n.length > h.length)) {
            return -1;
        } else if(h.length > (2**128 - 1)) {
            // since we have to be able to return -1 (if the char isn't found or input error), this function must return an "int" type with a max length of (2^128 - 1)
            return -1;
        } else {
            uint subindex = 0;
            for (uint i = 0; i < h.length; i ++) {
                // found the first char of b
                if (h[i] == n[0]) {
                    subindex = 1;
                    // search until the chars don't match or until we reach the end of a or b
                    while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex]) {
                        subindex++;
                    }

                    if(subindex == n.length) {
                        return int(i);
                    }
                }
            }
            return -1;
        }
    }


    function concat3(
        string memory _a,
        string memory _b,
        string memory _c,
        string memory _sep
    )
        public pure
        returns (string memory)
    {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        bytes memory c = bytes(_c);
        bytes memory sep = bytes(_sep);

        uint concatLength = a.length + sep.length + b.length + sep.length + c.length;
        string memory concatedStr = new string(concatLength);
        bytes memory concatedBytes = bytes(concatedStr);

        uint k = 0;
        for (uint i = 0; i < a.length; i++) {
            concatedBytes[k++] = a[i];
        }
        concatedBytes[k++] = sep[0];
        for (uint i = 0; i < b.length; i++) {
            concatedBytes[k++] = b[i];
        }
        concatedBytes[k++] = sep[0];
        for (uint i = 0; i < c.length; i++) {
            concatedBytes[k++] = c[i];
        }

        return string(concatedBytes);
    }
}

